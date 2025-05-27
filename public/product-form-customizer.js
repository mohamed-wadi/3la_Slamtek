/**
 * Script de personnalisation du formulaire d'ajout de produit
 */
document.addEventListener('DOMContentLoaded', function() {
    // Fonction principale de personnalisation
    function customizeProductForm() {
        // Vérifier si nous sommes sur la page de création de produit
        if (window.location.href.includes('/admin/catalog/products/create')) {
            console.log('Personnalisation du formulaire de produit...');
            
            // 1. Masquer tous les types sauf "simple"
            const typeField = document.querySelector('select[name="type"]');
            if (typeField) {
                // Sélectionner l'option "simple"
                for (let i = 0; i < typeField.options.length; i++) {
                    if (typeField.options[i].value === 'simple') {
                        typeField.selectedIndex = i;
                        break;
                    }
                }
                
                // Masquer le conteneur parent
                const typeContainer = typeField.closest('.control-group');
                if (typeContainer) {
                    typeContainer.style.display = 'none';
                }
            }
            
            // 2. Masquer le champ famille d'attributs
            const familyField = document.querySelector('select[name="attribute_family_id"]');
            if (familyField) {
                // Sélectionner la première option par défaut
                if (familyField.options.length > 0) {
                    familyField.selectedIndex = 0;
                }
                
                // Masquer le conteneur parent avec force
                const familyContainer = familyField.closest('.control-group');
                if (familyContainer) {
                    familyContainer.style.display = 'none';
                    familyContainer.style.visibility = 'hidden';
                }
            }
            
            // 3. Générer un SKU aléatoire et masquer le champ
            const skuField = document.querySelector('input[name="sku"]');
            if (skuField) {
                // Générer un SKU aléatoire
                const randomSku = 'SKU-' + Math.random().toString(36).substring(2, 10).toUpperCase();
                skuField.value = randomSku;
                
                // Masquer le conteneur parent avec force
                const skuContainer = skuField.closest('.control-group');
                if (skuContainer) {
                    skuContainer.style.display = 'none';
                    skuContainer.style.visibility = 'hidden';
                }
                
                // S'assurer que le SKU est conservé lors de la soumission du formulaire
                document.querySelector('form').addEventListener('submit', function() {
                    if (!skuField.value) {
                        skuField.value = randomSku;
                    }
                });
            }
            
            // Fonction pour vérifier périodiquement si les champs sont bien masqués
            function ensureFieldsHidden() {
                // Vérifier family
                const familyContainer = document.querySelector('select[name="attribute_family_id"]')?.closest('.control-group');
                if (familyContainer && familyContainer.style.display !== 'none') {
                    familyContainer.style.display = 'none';
                    familyContainer.style.visibility = 'hidden';
                }
                
                // Vérifier SKU
                const skuContainer = document.querySelector('input[name="sku"]')?.closest('.control-group');
                if (skuContainer && skuContainer.style.display !== 'none') {
                    skuContainer.style.display = 'none';
                    skuContainer.style.visibility = 'hidden';
                }
            }
            
            // Exécuter la vérification toutes les secondes pendant 10 secondes
            for (let i = 1; i <= 10; i++) {
                setTimeout(ensureFieldsHidden, i * 1000);
            }
            
            console.log('Personnalisation terminée avec succès!');
        }
    }
    
    // Appliquer les personnalisations immédiatement
    customizeProductForm();
    
    // Réappliquer après chaque changement de DOM (pour les applications SPA)
    const observer = new MutationObserver(function(mutations) {
        // Vérifier si nous sommes sur la page de création de produit
        if (window.location.href.includes('/admin/catalog/products/create')) {
            customizeProductForm();
        }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Appliquer également après un délai pour s'assurer que tout est chargé
    setTimeout(customizeProductForm, 500);
    setTimeout(customizeProductForm, 1000);
    setTimeout(customizeProductForm, 2000);
});
