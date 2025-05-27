<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Webkul\Core\Tree;

class MenuServiceProvider extends ServiceProvider
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
        // Cette méthode intercepte le menu 'customer' et supprime l'option "Downloadable Products"
        $this->app->booted(function () {
            $customerMenus = config('menu');
            
            // Filtrer pour retirer l'option "Downloadable Products"
            $filteredMenus = array_filter($customerMenus, function ($item) {
                return $item['key'] !== 'account.downloadables';
            });
            
            // Réindexer le tableau
            $filteredMenus = array_values($filteredMenus);
            
            // Remplacer la configuration du menu
            config(['menu' => $filteredMenus]);
            
            // Nettoyer le singleton du menu pour qu'il soit recréé avec la nouvelle configuration
            if ($this->app->has('menu')) {
                $this->app->forgetInstance('menu');
                $this->app->singleton('menu', function ($app) {
                    return new Tree();
                });
            }
        });
    }
}
