// Function to manage tabs functionality
// Parameters:
// - tabsSelector: selector for individual tabs
// - tabsContentSelector: selector for the content associated with each tab
// - tabsParentSelector: selector for the parent element containing the tabs
// - activeClass: the CSS class applied to the active tab
// - storageKey: optional parameter to store the active tab in localStorage (default is 'figure')
export function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass, storageKey = 'figure') {
    
    // Query all tab elements and content elements
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    // Function to hide all tab contents and remove active class from tabs
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');             // Hide content
            item.classList.remove('show', 'fade');  // Remove visibility and animation
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);     // Remove active class from all tabs
        });
    }

    // Function to show a specific tab content based on index (default is 0)
    function showTabContent(i = 0) {
        if (tabs[i] && tabsContent[i]) {  // Check if the tab and its content exist
            tabsContent[i].classList.add('show', 'fade');  // Show and animate the content
            tabsContent[i].classList.remove('hide');       // Remove the hidden state
            tabs[i].classList.add(activeClass);            // Add active class to the tab
        } else {
            console.error(`Tab or content with index ${i} not found`);  // Log an error if index is invalid
        }
    }

    // Retrieve saved tab index from localStorage (using storageKey)
    let savedTab = localStorage.getItem(storageKey);
    
    // Find the index of the tab with the saved ID, or default to -1 if not found
    let startTab = [...tabs].findIndex(tab => tab.getAttribute('id') === savedTab);

    // If no matching tab is found, default to the first tab
    if (startTab === -1) {
        startTab = 0;
    }

    // Initially hide all tab content and show the saved or default tab
    hideTabContent();
    showTabContent(startTab);

    // Event listener for click events on the tab parent element
    tabsParent.addEventListener('click', (event) => {
        const target = event.target.closest(tabsSelector);  // Check if the clicked target is a tab
        if (target) {
            // Loop through all tabs and match the clicked tab with an index
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();  // Hide all tab content
                    showTabContent(i); // Show content for the clicked tab
                    // Save the clicked tab's ID in localStorage
                    localStorage.setItem(storageKey, target.getAttribute('id'));
                }
            });
        }
    });
}
