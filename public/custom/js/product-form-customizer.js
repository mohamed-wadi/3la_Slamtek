/**
 * Script de personnalisation du formulaire d'ajout de produit
 * 
 * Ce script effectue les modifications suivantes :
 * 1. Définit le type de produit à "simple" par défaut et masque les autres options
 * 2. Masque le champ "famille" (attribute_family_id)
 * 3. Génère automatiquement un SKU aléatoire
 */
document.addEventListener('DOMContentLoaded', function() {
    // Fonction qui génère un SKU aléatoire
    function generateRandomSKU() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = 'SKU-';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Fonction principale qui applique toutes les personnalisations
    function customizeProductForm() {
        // Vérifier si nous sommes sur la page d'ajout de produit
        if (window.location.href.includes('/admin/catalog/products/create')) {
            console.log('Personnalisation du formulaire d\'ajout de produit...');
            
            // 1. Définir le type de produit à "simple" et masquer les autres options
            const typeSelects = document.querySelectorAll('select[name="type"]');
            if (typeSelects.length > 0) {
                const typeSelect = typeSelects[0];
                
                // Masquer les options autres que "simple"
                Array.from(typeSelect.options).forEach(option => {
                    if (option.value !== 'simple') {
                        option.style.display = 'none';
                    }
                });
                
                // Sélectionner "simple" par défaut
                for (let i = 0; i < typeSelect.options.length; i++) {
                    if (typeSelect.options[i].value === 'simple') {
                        typeSelect.selectedIndex = i;
                        break;
                    }
                }
                
                // Désactiver le select pour empêcher les changements
                typeSelect.disabled = true;
                
                // Masquer le conteneur parent du select si possible
                const typeFieldContainer = typeSelect.closest('.control-group');
                if (typeFieldContainer) {
                    typeFieldContainer.style.display = 'none';
                }
            }
            
            // 2. Masquer le champ "famille" (attribute_family_id)
            const familySelects = document.querySelectorAll('select[name="attribute_family_id"]');
            if (familySelects.length > 0) {
                const familySelect = familySelects[0];
                
                // Sélectionner la première option par défaut si disponible
                if (familySelect.options.length > 0) {
                    familySelect.selectedIndex = 0;
                }
                
                // Masquer le conteneur parent du select si possible
                const familyFieldContainer = familySelect.closest('.control-group');
                if (familyFieldContainer) {
                    familyFieldContainer.style.display = 'none';
                }
            }
            
            // 3. Générer automatiquement un SKU
            const skuFields = document.querySelectorAll('input[name="sku"]');
            if (skuFields.length > 0) {
                const skuField = skuFields[0];
                
                // Générer et définir un SKU aléatoire
                skuField.value = generateRandomSKU();
                
                // Masquer le conteneur parent du champ si possible
                const skuFieldContainer = skuField.closest('.control-group');
                if (skuFieldContainer) {
                    skuFieldContainer.style.display = 'none';
                }
            }
            
            console.log('Personnalisation du formulaire terminée!');
        }
    }

    // Exécuter les personnalisations
    customizeProductForm();
    
    // Appliquer à nouveau en cas de changement d'URL (navigation SPA)
    let lastUrl = window.location.href;
    new MutationObserver(() => {
        const url = window.location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            setTimeout(customizeProductForm, 500);
        }
    }).observe(document, {subtree: true, childList: true});
});
