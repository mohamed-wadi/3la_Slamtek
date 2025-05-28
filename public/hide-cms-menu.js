/**
 * Script pour masquer le menu CMS complet dans l'administration
 */
document.addEventListener('DOMContentLoaded', function() {
    function hideCmsMenu() {
        // Masquer l'u00e9lu00e9ment du menu principal CMS
        const cmsMenuItems = document.querySelectorAll('a, p, div, span');
        
        cmsMenuItems.forEach(function(element) {
            // Rechercher par texte
            if (element.textContent && (element.textContent.trim() === 'CMS' || element.textContent.trim() === 'Cms')) {
                // Trouver l'u00e9lu00e9ment parent du menu
                const menuItem = element.closest('.px-4') || element.closest('.menu-item') || element.closest('div');
                
                if (menuItem) {
                    // Masquer l'u00e9lu00e9ment du menu complet
                    menuItem.style.display = 'none';
                }
            }
            
            // Rechercher par attributs
            if (element.getAttribute && 
                (element.getAttribute('href') && element.getAttribute('href').includes('/cms') ||
                 element.getAttribute('class') && element.getAttribute('class').includes('cms') ||
                 element.getAttribute('data-menu-key') && element.getAttribute('data-menu-key').includes('cms'))) {
                
                // Trouver l'u00e9lu00e9ment parent du menu
                const menuItem = element.closest('.px-4') || element.closest('.menu-item') || element.closest('div');
                
                if (menuItem) {
                    // Masquer l'u00e9lu00e9ment du menu complet
                    menuItem.style.display = 'none';
                }
            }
        });
        
        // Masquer u00e9galement tous les liens qui pourraient u00eatre des sous-menus de CMS
        const cmsSubmenus = document.querySelectorAll('a');
        
        cmsSubmenus.forEach(function(link) {
            if (link.href && (link.href.includes('/cms') || link.href.includes('/pages'))) {
                // Trouver l'u00e9lu00e9ment parent du menu
                const menuItem = link.closest('li') || link.closest('.menu-item') || link.closest('div');
                
                if (menuItem) {
                    // Masquer l'u00e9lu00e9ment du menu complet
                    menuItem.style.display = 'none';
                }
            }
        });
    }
    
    // Exu00e9cuter immu00e9diatement
    hideCmsMenu();
    
    // Exu00e9cuter u00e0 nouveau apru00e8s des du00e9lais pour s'assurer que le DOM est complu00e8tement chargu00e9
    setTimeout(hideCmsMenu, 500);
    setTimeout(hideCmsMenu, 1000);
    setTimeout(hideCmsMenu, 2000);
    
    // Utiliser un MutationObserver pour du00e9tecter les changements dynamiques
    const observer = new MutationObserver(function(mutations) {
        hideCmsMenu();
    });
    
    // Du00e9marrer l'observation
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
