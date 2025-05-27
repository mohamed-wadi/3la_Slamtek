/**
 * Script pour masquer le menu Marketing complet dans l'administration
 */
document.addEventListener('DOMContentLoaded', function() {
    function hideMarketingMenu() {
        // Masquer l'élément du menu principal Marketing
        const marketingMenuItems = document.querySelectorAll('a, p, div, span');
        
        marketingMenuItems.forEach(function(element) {
            // Rechercher par texte
            if (element.textContent && element.textContent.trim() === 'Marketing') {
                // Trouver l'élément parent du menu
                const menuItem = element.closest('.px-4') || element.closest('.menu-item') || element.closest('div');
                
                if (menuItem) {
                    // Masquer l'élément du menu complet
                    menuItem.style.display = 'none';
                }
            }
            
            // Rechercher par attributs
            if (element.getAttribute && 
                (element.getAttribute('href') && element.getAttribute('href').includes('/marketing') ||
                 element.getAttribute('class') && element.getAttribute('class').includes('marketing'))) {
                
                // Trouver l'élément parent du menu
                const menuItem = element.closest('.px-4') || element.closest('.menu-item') || element.closest('div');
                
                if (menuItem) {
                    // Masquer l'élément du menu complet
                    menuItem.style.display = 'none';
                }
            }
        });
        
        // Masquer également tous les liens qui pourraient être des sous-menus de Marketing
        const marketingSubmenus = document.querySelectorAll('a');
        
        marketingSubmenus.forEach(function(link) {
            if (link.href && (
                link.href.includes('/marketing') ||
                link.href.includes('/promotions') ||
                link.href.includes('/communications') ||
                link.href.includes('/campaigns') ||
                link.href.includes('/email-templates') ||
                link.href.includes('/events') ||
                link.href.includes('/newsletters') ||
                link.href.includes('/sitemaps')
            )) {
                // Trouver l'élément parent du menu
                const menuItem = link.closest('a');
                
                if (menuItem) {
                    // Masquer l'élément du menu
                    menuItem.style.display = 'none';
                }
            }
        });
    }
    
    // Exécuter immédiatement
    hideMarketingMenu();
    
    // Exécuter à nouveau après des délais pour s'assurer que le DOM est complètement chargé
    setTimeout(hideMarketingMenu, 500);
    setTimeout(hideMarketingMenu, 1000);
    setTimeout(hideMarketingMenu, 2000);
    
    // Observer les changements dans le DOM
    const observer = new MutationObserver(function(mutations) {
        hideMarketingMenu();
    });
    
    // Observer le corps du document pour tout changement
    observer.observe(document.body, { 
        childList: true,
        subtree: true 
    });
});
