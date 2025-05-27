<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\View;

class CustomScriptsServiceProvider extends ServiceProvider
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
        // Écouter l'événement 'bagisto.admin.layout.head' pour injecter notre script
        Event::listen('bagisto.admin.layout.body.after', function($viewRenderEventManager) {
            $viewRenderEventManager->addContent('<script src="' . asset('custom/js/product-form-customizer.js') . '"></script>');
        });
    }
}
