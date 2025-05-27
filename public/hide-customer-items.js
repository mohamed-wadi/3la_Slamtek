/**
 * Script pour masquer les éléments "Groups" et "GDPR Data Request" du menu Customers dans l'administration
 */
document.addEventListener('DOMContentLoaded', function() {
    function hideCustomerMenuItems() {
        // Chercher tous les liens du menu
        const menuLinks = document.querySelectorAll('a');
        
        // Parcourir tous les liens et masquer ceux qui contiennent "Groups" ou "GDPR"
        menuLinks.forEach(function(link) {
            // Vérifier l'URL du lien
            if (link.href && (
                link.href.includes('/groups') || 
                link.href.includes('/gdpr') ||
                link.href.includes('/customers/groups') ||
                link.href.includes('/customers/gdpr')
            )) {
                // Trouver l'élément parent (l'élément de menu complet)
                const menuItem = link.closest('a');
                
                if (menuItem) {
                    // Masquer l'élément de menu
                    menuItem.style.display = 'none';
                }
            }
            
            // Vérifier le texte du lien
            if (link.textContent) {
                const text = link.textContent.trim();
                if (
                    text === 'Groups' || 
                    text === 'Customer Groups' || 
                    text === 'GDPR' || 
                    text === 'GDPR Data Request' ||
                    text === 'Data Requests'
                ) {
                    // Masquer le lien directement
                    link.style.display = 'none';
                }
            }
        });
    }
    
    // Exécuter immédiatement
    hideCustomerMenuItems();
    
    // Exécuter à nouveau après un court délai pour s'assurer que le DOM est complètement chargé
    setTimeout(hideCustomerMenuItems, 500);
    setTimeout(hideCustomerMenuItems, 1000);
    
    // Pour les interfaces qui chargent le contenu dynamiquement
    // Observer les changements dans le DOM
    const observer = new MutationObserver(function(mutations) {
        hideCustomerMenuItems();
    });
    
    // Observer le corps du document pour tout changement
    observer.observe(document.body, { 
        childList: true,
        subtree: true 
    });
});
