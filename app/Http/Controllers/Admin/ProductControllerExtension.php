<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use Webkul\Admin\Http\Controllers\Catalog\ProductController as BaseProductController;
use Webkul\Product\Helpers\ProductType;
use Webkul\Admin\Http\Resources\ProductResource;

class ProductControllerExtension extends BaseProductController
{
    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store()
    {
        // Générer automatiquement un SKU
        if (! request()->has('sku')) {
            request()->merge(['sku' => 'SKU-' . strtoupper(Str::random(10))]);
        }

        // Définir le type comme "simple" par défaut
        if (! request()->has('type')) {
            request()->merge(['type' => 'simple']);
        }

        // Trouver la première famille d'attributs si elle n'est pas spécifiée
        if (! request()->has('attribute_family_id')) {
            $family = $this->attributeFamilyRepository->first();

            if ($family) {
                request()->merge(['attribute_family_id' => $family->id]);
            }
        }

        // Valider uniquement les champs nécessaires
        $this->validate(request(), [
            'type' => 'required',
            'attribute_family_id' => 'required',
            'sku' => ['unique:products,sku'],
        ]);

        if (
            ProductType::hasVariants(request()->input('type'))
            && ! request()->has('super_attributes')
        ) {
            return new JsonResponse([
                'message' => trans('admin::app.catalog.products.configurable-error'),
            ], 400);
        }

        $product = $this->productRepository->create(request()->all());

        session()->flash('success', trans('admin::app.catalog.products.create-success'));

        return new JsonResponse([
            'data' => new ProductResource($product),
        ]);
    }
}
