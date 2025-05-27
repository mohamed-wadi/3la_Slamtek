<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ProductControllerExtension;

class CustomizationServiceProvider extends ServiceProvider
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
        // Surcharger la route du contrôleur de produits pour utiliser notre version personnalisée
        Route::group(['middleware' => ['web', 'admin']], function () {
            Route::post('admin/catalog/products', [ProductControllerExtension::class, 'store'])
                ->name('admin.catalog.products.store');
        });
    }
}
