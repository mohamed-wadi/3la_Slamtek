/**
 * Script pour masquer les éléments spécifiques du menu Settings
 */
document.addEventListener('DOMContentLoaded', function() {
    function hideSettingsItems() {
        // Liste des éléments à masquer
        const itemsToHide = [
            { text: 'Channels', href: '/channels' },
            { text: 'Inventory Source', href: '/inventory-sources' },
            { text: 'Exchange Rate', href: '/exchange-rates' },
            { text: 'Theme', href: '/themes' },
            { text: 'Data Transfer', href: '/data-transfer' },
            { text: 'Role', href: '/roles' }
        ];

        // Masquer les éléments par texte
        const settingsMenuItems = document.querySelectorAll('a, p, div, span');
        
        settingsMenuItems.forEach(function(element) {
            itemsToHide.forEach(item => {
                // Rechercher par texte
                if (element.textContent && element.textContent.trim().toLowerCase() === item.text.toLowerCase()) {
                    // Trouver l'élément parent du menu
                    const menuItem = element.closest('.px-4') || element.closest('.menu-item') || element.closest('div');
                    
                    if (menuItem) {
                        // Masquer l'élément du menu complet
                        menuItem.style.display = 'none';
                    }
                }
                
                // Rechercher par attributs
                if (element.getAttribute && 
                    (element.getAttribute('href') && element.getAttribute('href').includes(item.href) ||
                     element.getAttribute('class') && element.getAttribute('class').includes(item.text.toLowerCase()) ||
                     element.getAttribute('data-menu-key') && element.getAttribute('data-menu-key').includes(item.text.toLowerCase()))) {
                    
                    // Trouver l'élément parent du menu
                    const menuItem = element.closest('.px-4') || element.closest('.menu-item') || element.closest('div');
                    
                    if (menuItem) {
                        // Masquer l'élément du menu complet
                        menuItem.style.display = 'none';
                    }
                }
            });
        });

        // Masquer les éléments par URL
        const settingsSubmenus = document.querySelectorAll('a');
        
        settingsSubmenus.forEach(function(link) {
            itemsToHide.forEach(item => {
                if (link.href && link.href.includes(item.href)) {
                    // Trouver l'élément parent du menu
                    const menuItem = link.closest('li') || link.closest('.menu-item') || link.closest('div');
                    
                    if (menuItem) {
                        // Masquer l'élément du menu complet
                        menuItem.style.display = 'none';
                    }
                }
            });
        });
    }
    
    // Exécuter immédiatement
    hideSettingsItems();
    
    // Exécuter à nouveau après des délais pour s'assurer que le DOM est complètement chargé
    setTimeout(hideSettingsItems, 500);
    setTimeout(hideSettingsItems, 1000);
    setTimeout(hideSettingsItems, 2000);
    
    // Utiliser un MutationObserver pour détecter les changements dynamiques
    const observer = new MutationObserver(function(mutations) {
        hideSettingsItems();
    });
    
    // Démarrer l'observation
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
