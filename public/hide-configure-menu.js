// Script pour masquer le menu Configure dans l'interface d'administration de Bagisto
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour masquer le menu Configure
    function hideConfigureMenu() {
        // Sélecteur pour le menu Configure
        const configureMenu = document.querySelector('li[title="Configure"]');
        
        if (configureMenu) {
            // Masquer le menu Configure
            configureMenu.style.display = 'none';
            console.log('Menu Configure masqué avec succès');
        } else {
            // Si le menu n'est pas encore chargé, on réessaie après un court délai
            setTimeout(hideConfigureMenu, 500);
        }
    }

    // Appel initial de la fonction
    hideConfigureMenu();

    // Observer les changements dans le DOM au cas où le menu serait chargé dynamiquement
    const observer = new MutationObserver(function() {
        hideConfigureMenu();
    });

    // Commencer à observer le document avec les paramètres configurés
    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
});
