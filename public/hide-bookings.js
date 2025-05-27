/**
 * Script pour masquer l'élément "Bookings" du menu Sales dans l'administration
 */
document.addEventListener('DOMContentLoaded', function() {
    function hideBookingsMenuItem() {
        // Chercher tous les liens du menu
        const menuLinks = document.querySelectorAll('a');
        
        // Parcourir tous les liens et masquer ceux qui contiennent "Bookings"
        menuLinks.forEach(function(link) {
            // Vérifier l'URL du lien
            if (link.href && link.href.includes('/bookings')) {
                // Trouver l'élément parent (l'élément de menu complet)
                const menuItem = link.closest('a');
                
                if (menuItem) {
                    // Masquer l'élément de menu
                    menuItem.style.display = 'none';
                }
            }
            
            // Vérifier le texte du lien
            if (link.textContent && link.textContent.trim() === 'Bookings') {
                // Masquer le lien directement
                link.style.display = 'none';
            }
        });
    }
    
    // Exécuter immédiatement
    hideBookingsMenuItem();
    
    // Exécuter à nouveau après un court délai pour s'assurer que le DOM est complètement chargé
    setTimeout(hideBookingsMenuItem, 500);
    
    // Pour les interfaces qui chargent le contenu dynamiquement
    // Observer les changements dans le DOM
    const observer = new MutationObserver(function(mutations) {
        hideBookingsMenuItem();
    });
    
    // Observer le corps du document pour tout changement
    observer.observe(document.body, { 
        childList: true,
        subtree: true 
    });
});
