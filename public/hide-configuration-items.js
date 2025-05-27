document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour masquer les éléments de configuration indésirables
    function hideUnwantedConfigurationItems() {
        // Sélecteur pour le menu latéral de configuration
        const configMenu = document.querySelector('div[data-menu-key="configuration"]');
        
        if (configMenu) {
            // Masquer Magic AI
            const magicAiItem = configMenu.querySelector('a[href*="magic-ai"]');
            if (magicAiItem) {
                magicAiItem.closest('li')?.remove();
            }
            
            // Masquer Google Captcha
            const captchaItem = configMenu.querySelector('a[href*="captcha"]');
            if (captchaItem) {
                captchaItem.closest('li')?.remove();
            }
            
            // Masquer les éléments dans la page de configuration
            const configContent = document.querySelector('.configuration-page');
            if (configContent) {
                // Masquer la section Magic AI
                const magicAiSection = configContent.querySelector('div[data-menu-key*="magic_ai"]');
                if (magicAiSection) {
                    magicAiSection.style.display = 'none';
                }
                
                // Masquer la section Captcha
                const captchaSection = configContent.querySelector('div[data-menu-key*="captcha"]');
                if (captchaSection) {
                    captchaSection.style.display = 'none';
                }
            }
        }
    }
    
    // Exécuter la fonction immédiatement
    hideUnwantedConfigurationItems();
    
    // Utiliser un MutationObserver pour gérer le chargement dynamique du contenu
    const observer = new MutationObserver(function(mutations) {
        hideUnwantedConfigurationItems();
    });
    
    // Commencer à observer le corps du document pour les changements
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
