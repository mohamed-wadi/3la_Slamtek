// Function to hide Magic AI and Google Captcha from the configuration menu
function hideConfigureMenuItems() {
    // Wait for the DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Function to hide the menu items
        const hideItems = () => {
            // Find all menu items
            const menuItems = document.querySelectorAll('.menu-item');
            
            // Loop through each menu item
            menuItems.forEach(item => {
                // Check if the menu item contains 'Magic AI' or 'Google Captcha'
                const itemText = item.textContent.trim();
                if (itemText.includes('Magic AI') || itemText.includes('Google Captcha')) {
                    // Hide the parent menu item
                    item.style.display = 'none';
                    
                    // If this is a submenu item, also hide its parent menu item
                    const parentMenu = item.closest('.nav-menu');
                    if (parentMenu) {
                        parentMenu.style.display = 'none';
                    }
                }
            });
        };

        // Run the function immediately
        hideItems();

        // Also run it after a short delay to catch any dynamically loaded content
        setTimeout(hideItems, 1000);
    });
}

// Call the function
hideConfigureMenuItems();
