import { tabs } from '../modules/tabs/tabs.js'
import { initializeCalculations } from '../modules/calculations/calculations.js';

window.addEventListener('DOMContentLoaded', function() {
    // Вызов для общего слайдера фигур
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active', 'generalTab');

// Вызов для вкладок с фигурами
    tabs('.calculating__choose-item', '.tabcontent__dimensions', '.tabcontent', 'calculating__choose-item_active', 'figureTab');
    
    initializeCalculations();
});
