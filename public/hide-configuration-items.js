/**
 * Script pour masquer le menu Configuration complet dans l'administration
 */
document.addEventListener('DOMContentLoaded', function() {
    function hideConfigurationMenu() {
        // Masquer l'élément du menu principal Configuration
        const configMenuItems = document.querySelectorAll('a, p, div, span');
        
        configMenuItems.forEach(function(element) {
            // Rechercher par texte
            if (element.textContent && element.textContent.trim() === 'Configure') {
                // Trouver l'élément parent du menu
                const menuItem = element.closest('.px-4') || element.closest('.menu-item') || element.closest('div');
                
                if (menuItem) {
                    // Masquer l'élément du menu complet
                    menuItem.style.display = 'none';
                }
            }
            
            // Rechercher par attributs
            if (element.getAttribute && 
                (element.getAttribute('href') && element.getAttribute('href').includes('/configuration') ||
                 element.getAttribute('class') && element.getAttribute('class').includes('configuration') ||
                 element.getAttribute('data-menu-key') && element.getAttribute('data-menu-key').includes('configuration'))) {
                
                // Trouver l'élément parent du menu
                const menuItem = element.closest('.px-4') || element.closest('.menu-item') || element.closest('div');
                
                if (menuItem) {
                    // Masquer l'élément du menu complet
                    menuItem.style.display = 'none';
                }
            }
        });
        
        // Masquer également tous les liens qui pourraient être des sous-menus de Configuration
        const configSubmenus = document.querySelectorAll('a');
        
        configSubmenus.forEach(function(link) {
            if (link.href && link.href.includes('/configuration')) {
                // Trouver l'élément parent du menu
                const menuItem = link.closest('li') || link.closest('.menu-item') || link.closest('div');
                
                if (menuItem) {
                    // Masquer l'élément du menu complet
                    menuItem.style.display = 'none';
                }
            }
        });
    }
    
    // Exécuter immédiatement
    hideConfigurationMenu();
    
    // Exécuter à nouveau après des délais pour s'assurer que le DOM est complètement chargé
    setTimeout(hideConfigurationMenu, 500);
    setTimeout(hideConfigurationMenu, 1000);
    setTimeout(hideConfigurationMenu, 2000);
    
    // Utiliser un MutationObserver pour détecter les changements dynamiques
    const observer = new MutationObserver(function(mutations) {
        hideConfigurationMenu();
    });
    
    // Démarrer l'observation
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
