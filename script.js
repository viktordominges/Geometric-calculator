function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass, storageKey = 'figure') {
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        if (tabs[i] && tabsContent[i]) { // Проверяем, существует ли вкладка и контент
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add(activeClass);
        } else {
            console.error(`Tab or content with index ${i} not found`);
        }
    }

    let savedTab = localStorage.getItem(storageKey);
    let startTab = [...tabs].findIndex(tab => tab.getAttribute('id') === savedTab);

    // Если не найдено совпадение, возвращаем первую вкладку
    if (startTab === -1) {
        startTab = 0;
    }

    hideTabContent();
    showTabContent(startTab);

    tabsParent.addEventListener('click', (event) => {
        const target = event.target.closest(tabsSelector);
        if (target) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                    localStorage.setItem(storageKey, target.getAttribute('id'));
                }
            });
        }
    });
}

function calculate(figureData) {
    const { perimeterSelector, areaSelector, inputs, calculateFn } = figureData;
    const resultPerimeter = document.querySelector(perimeterSelector);
    const resultArea = document.querySelector(areaSelector);
    let inputData = {};

    function calcTotal() {
        const result = calculateFn(inputData);
        if (result) {
            resultPerimeter.textContent = result.perimeter;
            resultArea.textContent = result.area;
        } else {
            resultPerimeter.textContent = '____';
            resultArea.textContent = '____';
        }
    }

    calcTotal();

    inputs.forEach(({ selector, property }) => {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = 'none';
                inputData[property] = +input.value;
            }
            calcTotal();
        });
    });
}

function initializeCalculations() {
    const figures = {
        square: {
            perimeterSelector: '#result_square_perimeter',
            areaSelector: '#result_square_area',
            inputs: [{ selector: '#square_side', property: 'side' }],
            calculateFn: ({ side }) => side ? {
                perimeter: side * 4,
                area: side * side
            } : null
        },
        rectangle: {
            perimeterSelector: '#result_rectangle_perimeter',
            areaSelector: '#result_rectangle_area',
            inputs: [
                { selector: '#rectangle_width', property: 'width' },
                { selector: '#rectangle_height', property: 'height' }
            ],
            calculateFn: ({ width, height }) => (width && height) ? {
                perimeter: (width + height) * 2,
                area: width * height
            } : null
        },
        triangle: {
            perimeterSelector: '#result_triangle_perimeter',
            areaSelector: '#result_triangle_area',
            inputs: [
                { selector: '#triangle_leg_1', property: 'leg1' },
                { selector: '#triangle_leg_2', property: 'leg2' }
            ],
            calculateFn: ({ leg1, leg2 }) => (leg1 && leg2) ? {
                perimeter: leg1 + leg2 + parseFloat(Math.sqrt(leg1 ** 2 + leg2 ** 2).toFixed(1)),
                area: (leg1 * leg2) / 2
            } : null
        },
        circle: {
            perimeterSelector: '#result_circle_perimeter',
            areaSelector: '#result_circle_area',
            inputs: [{ selector: '#radius', property: 'radius' }],
            calculateFn: ({ radius }) => radius ? {
                perimeter: (radius * Math.PI * 2).toFixed(1),
                area: (Math.PI * (radius ** 2)).toFixed(1)
            } : null
        }
    };

    // Получаем текущую фигуру из localStorage или устанавливаем значение по умолчанию
    const currentFigure = localStorage.getItem('figure') || 'square';

    // Проверяем, существует ли текущая фигура в figures
    if (figures[currentFigure]) {
        calculate(figures[currentFigure]);
    } else {
        console.error(`Figure "${currentFigure}" is not defined in figures.`);
        calculate(figures['square']); // Устанавливаем значение по умолчанию, если не найдено
    }

    document.querySelectorAll('.calculating__choose-item').forEach(tab => {
        tab.addEventListener('click', () => {
            const figureId = tab.getAttribute('id');
            if (figures[figureId]) {
                calculate(figures[figureId]);
                localStorage.setItem('figure', figureId); // Сохраняем выбранную фигуру
            } else {
                console.error(`Figure "${figureId}" is not defined in figures.`);
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', function() {
    // Вызов для общего слайдера фигур
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active', 'generalTab');

// Вызов для вкладок с фигурами
    tabs('.calculating__choose-item', '.tabcontent__dimensions', '.tabcontent', 'calculating__choose-item_active', 'figureTab');
    
    initializeCalculations();
});
