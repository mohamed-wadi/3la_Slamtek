<!DOCTYPE html>

<html
    class="{{ request()->cookie('dark_mode') ?? 0 ? 'dark' : '' }}"
    lang="{{ app()->getLocale() }}"
    dir="{{ core()->getCurrentLocale()->direction }}"
>

<head>

    {!! view_render_event('bagisto.admin.layout.head.before') !!}

    <title>{{ $title ?? '' }}</title>

    <meta charset="UTF-8">

    <meta
        http-equiv="X-UA-Compatible"
        content="IE=edge"
    >
    <meta
        http-equiv="content-language"
        content="{{ app()->getLocale() }}"
    >

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >
    <meta
        name="base-url"
        content="{{ url()->to('/') }}"
    >
    <meta
        name="currency"
        content="{{ core()->getBaseCurrency()->toJson() }}"
    >

    @stack('meta')

    @bagistoVite(['src/Resources/assets/css/app.css', 'src/Resources/assets/js/app.js'])

    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
    />

    <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap"
        rel="stylesheet"
    />

    <link
        rel="preload"
        as="image"
        href="{{ url('cache/logo/bagisto.png') }}"
    >

    @if ($favicon = core()->getConfigData('general.design.admin_logo.favicon'))
        <link
            type="image/x-icon"
            href="{{ Storage::url($favicon) }}"
            rel="shortcut icon"
            sizes="16x16"
        >
    @else
        <link
            type="image/x-icon"
            href="{{ bagisto_asset('images/favicon.ico') }}"
            rel="shortcut icon"
            sizes="16x16"
        />
    @endif

    @stack('styles')

    <style>
        {!! core()->getConfigData('general.content.custom_scripts.custom_css') !!}
        
        /* Masquer spécifiquement l'élément Bookings du menu Sales */
        .sidebar-sales a[href*="booking"],
        a[href*="admin/sales/bookings"],
        a[href*="/bookings"] {
            display: none !important;
        }
        
        /* Masquer les éléments Attribute et Attribute Family du menu Catalog */
        a[href*="/attributes"],
        a[href*="/attribute-families"],
        a[href*="/catalog/attributes"],
        a[href*="/catalog/families"],
        .menu-item a[href*="attributes"],
        .menu-item a[href*="families"] {
            display: none !important;
        }
        
        /* Masquer les éléments Groups et GDPR Data Request du menu Customers */
        a[href*="/groups"],
        a[href*="/gdpr"],
        a[href*="/customers/groups"],
        a[href*="/customers/gdpr"],
        .menu-item a[href*="groups"],
        .menu-item a[href*="gdpr"] {
            display: none !important;
        }
        
        /* Masquer le menu Marketing complet */
        a[href*="/marketing"],
        a[href*="/admin/marketing"],
        .icon-marketing,
        [class*="marketing"],
        a[href*="/promotions"],
        a[href*="/communications"],
        a[href*="/campaigns"],
        a[href*="/email-templates"],
        a[href*="/events"],
        a[href*="/newsletters"],
        a[href*="/sitemaps"] {
            display: none !important;
        }
    </style>

    <!-- CSS personnalisé pour masquer des éléments de l'interface admin -->
    <link rel="stylesheet" href="{{ asset('admin-customizations.css') }}">

    {!! view_render_event('bagisto.admin.layout.head.after') !!}
</head>

<body class="h-full dark:bg-gray-950">
    {!! view_render_event('bagisto.admin.layout.body.before') !!}

    <div
        id="app"
        class="h-full"
    >
        <!-- Flash Message Blade Component -->
        <x-admin::flash-group />

        <!-- Confirm Modal Blade Component -->
        <x-admin::modal.confirm />

        {!! view_render_event('bagisto.admin.layout.content.before') !!}

        <!-- Page Header Blade Component -->
        <x-admin::layouts.header />

        <div
            class="group/container {{ request()->cookie('sidebar_collapsed') ?? 0 ? 'sidebar-collapsed' : 'sidebar-not-collapsed' }} flex gap-4"
            ref="appLayout"
        >
            <!-- Page Sidebar Blade Component -->
            <x-admin::layouts.sidebar />

            <div class="flex min-h-[calc(100vh-62px)] max-w-full flex-1 flex-col bg-white pt-3 transition-all duration-300 dark:bg-gray-950 ltr:pl-[270px] group-[.sidebar-collapsed]/container:ltr:pl-[69px] rtl:pr-[270px] group-[.sidebar-collapsed]/container:rtl:pr-[69px]">
                <!-- Added dynamic tabs for third level menus  -->
                <div class="px-4 pb-6">
                    <!-- Todo @suraj-webkul need to optimize below statement. -->
                    @if (! request()->routeIs('admin.configuration.index'))
                        <x-admin::layouts.tabs />
                    @endif

                    <!-- Page Content Blade Component -->
                    {{ $slot }}
                </div>

                <!-- Footer content removed -->
                <div class="mt-auto">
                    <div class="border-t bg-white py-2 text-center text-sm dark:border-gray-800 dark:bg-gray-900 dark:text-white">
                        <!-- Copyright removed -->
                    </div>
                </div>
            </div>
        </div>

        {!! view_render_event('bagisto.admin.layout.content.after') !!}
    </div>

    {!! view_render_event('bagisto.admin.layout.body.after') !!}

    @stack('scripts')

    <!-- Script pour masquer l'élément Bookings du menu Sales -->
    <script src="{{ asset('hide-bookings.js') }}"></script>
    
    <!-- Script pour masquer les éléments Attribute et Attribute Family du menu Catalog -->
    <script src="{{ asset('hide-catalog-items.js') }}"></script>
    
    <!-- Script pour masquer les éléments Groups et GDPR Data Request du menu Customers -->
    <script src="{{ asset('hide-customer-items.js') }}"></script>
    
    <!-- Script pour masquer le menu Marketing complet -->
    <script src="{{ asset('hide-marketing-menu.js') }}"></script>

    {!! view_render_event('bagisto.admin.layout.vue-app-mount.before') !!}

    <script>
        /**
         * Load event, the purpose of using the event is to mount the application
         * after all of our `Vue` components which is present in blade file have
         * been registered in the app. No matter what `app.mount()` should be
         * called in the last.
         */
        window.addEventListener("load", function(event) {
            app.mount("#app");
        });
    </script>

    {!! view_render_event('bagisto.admin.layout.vue-app-mount.after') !!}

    <!-- Script de personnalisation du formulaire produit -->
    <script src="{{ asset('product-form-customizer.js') }}"></script>
</body>

</html>
