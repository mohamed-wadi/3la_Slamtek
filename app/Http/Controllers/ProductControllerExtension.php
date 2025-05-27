<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Route;
use Webkul\Admin\Http\Resources\ProductResource;
use Webkul\Admin\Http\Controllers\Catalog\ProductController;

class ProductControllerExtension extends ProductController
{
    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {
        // Définir automatiquement le type comme "simple"
        request()->merge(['type' => 'simple']);
        
        // Générer automatiquement un SKU unique s'il n'est pas fourni
        if (! request()->has('sku') || empty(request()->input('sku'))) {
            $randomSku = 'SKU-' . strtoupper(Str::random(8));
            request()->merge(['sku' => $randomSku]);
        }
        
        // Sélectionner automatiquement la première famille d'attributs disponible
        if (! request()->has('attribute_family_id') || empty(request()->input('attribute_family_id'))) {
            $firstFamily = $this->attributeFamilyRepository->first();
            if ($firstFamily) {
                request()->merge(['attribute_family_id' => $firstFamily->id]);
            }
        }
        
        // Validation minimale nécessaire
        $this->validate(request(), [
            'type' => 'required',
            'attribute_family_id' => 'required',
            'sku' => ['required', 'unique:products,sku'],
        ]);
        
        Event::dispatch('catalog.product.create.before');
        
        $product = $this->productRepository->create(request()->all());
        
        Event::dispatch('catalog.product.create.after', $product);
        
        session()->flash('success', trans('admin::app.catalog.products.create-success'));
        
        return new JsonResponse([
            'data' => new ProductResource($product),
        ]);
    }
}
