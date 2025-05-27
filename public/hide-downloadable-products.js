/**
 * Script pour masquer UNIQUEMENT l'option "Downloadable Products" dans le menu du profil client
 */
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour masquer UNIQUEMENT l'option "Downloadable Products"
    function hideDownloadableProducts() {
        // Recherche de tous les liens dans le menu du compte client
        const accountLinks = document.querySelectorAll('a');
        
        // Parcourir tous les liens pour trouver UNIQUEMENT celui des produits téléchargeables
        accountLinks.forEach(link => {
            // Vérifier si le texte du lien contient "Downloadable Products" ou la version traduite
            // ou si l'URL contient "downloadable-products"
            const linkText = link.textContent.trim();
            const hasDownloadableText = 
                linkText.includes('Downloadable Products') || 
                linkText.includes('Produits téléchargeables');
                
            const hasDownloadableUrl = link.href && link.href.includes('downloadable-products');
            
            if (hasDownloadableText || hasDownloadableUrl) {
                // Masquer UNIQUEMENT cet élément spécifique, pas tout le menu
                console.log('Masquage de l\'élément Downloadable Products');
                const linkContainer = link.closest('div.flex.justify-between');
                if (linkContainer) {
                    linkContainer.style.display = 'none';
                }
            }
        });
    }
    
    // Exécuter la fonction immédiatement
    hideDownloadableProducts();
    
    // Réexécuter après plusieurs délais pour s'assurer que le DOM est complètement chargé
    setTimeout(hideDownloadableProducts, 500);
    setTimeout(hideDownloadableProducts, 1000);
    setTimeout(hideDownloadableProducts, 2000);
    
    // Observer les changements dans le DOM pour masquer l'option si le contenu change
    const observer = new MutationObserver(function(mutations) {
        hideDownloadableProducts();
    });
    
    // Démarrer l'observation du body pour détecter les changements
    observer.observe(document.body, { childList: true, subtree: true });
});
