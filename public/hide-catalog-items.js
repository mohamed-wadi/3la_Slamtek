/**
 * Script pour masquer les éléments "Attribute" et "Attribute Family" du menu Catalog dans l'administration
 */
document.addEventListener('DOMContentLoaded', function() {
    function hideCatalogMenuItems() {
        // Chercher tous les liens du menu
        const menuLinks = document.querySelectorAll('a');
        
        // Parcourir tous les liens et masquer ceux qui contiennent "Attribute" ou "Attribute Family"
        menuLinks.forEach(function(link) {
            // Vérifier l'URL du lien pour les attributs
            if (link.href && (
                link.href.includes('/attributes') || 
                link.href.includes('/attribute-families') ||
                link.href.includes('/catalog/attributes') ||
                link.href.includes('/catalog/families')
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
                if (text === 'Attributes' || text === 'Attribute Families' || text === 'Attribute families' || text === 'Attribute family') {
                    // Masquer le lien directement
                    link.style.display = 'none';
                }
            }
        });
    }
    
    // Exécuter immédiatement
    hideCatalogMenuItems();
    
    // Exécuter à nouveau après un court délai pour s'assurer que le DOM est complètement chargé
    setTimeout(hideCatalogMenuItems, 500);
    setTimeout(hideCatalogMenuItems, 1000);
    
    // Pour les interfaces qui chargent le contenu dynamiquement
    // Observer les changements dans le DOM
    const observer = new MutationObserver(function(mutations) {
        hideCatalogMenuItems();
    });
    
    // Observer le corps du document pour tout changement
    observer.observe(document.body, { 
        childList: true,
        subtree: true 
    });
});
