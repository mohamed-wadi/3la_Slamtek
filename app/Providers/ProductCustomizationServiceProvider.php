<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductControllerExtension;

class ProductCustomizationServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Remplacer la route pour la création de produit avec notre version personnalisée
        Route::group(['middleware' => ['web', 'admin']], function () {
            Route::post('admin/catalog/products', [ProductControllerExtension::class, 'store'])
                ->name('admin.catalog.products.store');
        });
    }
}
