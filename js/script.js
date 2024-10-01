// Importing the tabs function from the tabs module and the initializeCalculations function from the calculations module
import { tabs } from '../modules/tabs/tabs.js';
import { initializeCalculations } from '../modules/calculations/calculations.js';

// Adding an event listener to the window to ensure the DOM is fully loaded before executing the script
window.addEventListener('DOMContentLoaded', function() {

    // Initializing the first set of tabs (general content tabs)
    // Parameters:
    // 1. '.tabheader__item': Individual tab elements (buttons)
    // 2. '.tabcontent': Corresponding content sections for each tab
    // 3. '.tabheader__items': Parent element that contains all the tab buttons
    // 4. 'tabheader__item_active': CSS class to apply to the active tab
    // 5. 'generalTab': Key used to store the active tab in localStorage for persistence
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active', 'generalTab');

    // Initializing the second set of tabs (figure selection tabs for the calculator)
    // Parameters:
    // 1. '.calculating__choose-item': Individual tab elements for selecting different figures (square, rectangle, etc.)
    // 2. '.tabcontent__dimensions': Corresponding input section for entering figure dimensions
    // 3. '.tabcontent': Parent element that contains the figure input forms
    // 4. 'calculating__choose-item_active': CSS class to apply to the active tab (figure)
    // 5. 'figureTab': Key used to store the selected figure tab in localStorage for persistence
    tabs('.calculating__choose-item', '.tabcontent__dimensions', '.tabcontent', 'calculating__choose-item_active', 'figureTab');
    
    // Initializing the calculations for geometric figures
    // This function sets up the calculation logic (perimeter and area) for different figures and integrates user input
    initializeCalculations();
});

