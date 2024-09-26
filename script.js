function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	let tabs = document.querySelectorAll(tabsSelector),
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
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
        const target = event.target;
        // Используем closest для поиска ближайшего элемента, соответствующего селектору таба
        const tab = target.closest(tabsSelector);
    
        // Проверяем, что нашли нужный элемент, и он не null
        if (tab) {
            tabs.forEach((item, i) => {
                if (tab == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

function calcSquare() {
    const resultPerimeter = document.querySelector('#result_square_perimeter');
    const resultArea = document.querySelector('#result_square_area');
    
    let figure, side;

    if (localStorage.getItem('figure')) {
        figure = localStorage.getItem('figure');
    } else {
        figure = 'square';
        localStorage.setItem('figure', 'square');
    }

    function calcTotal() {
        if (!figure || figure != 'square' || !side) {
            resultPerimeter.textContent = '____';
            resultArea.textContent = '____';
            return;
        }
        else {
            resultPerimeter.textContent = side * 4;
            resultArea.textContent = side * side;
        }
    }

    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('figure')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('.calculating__choose-item', 'calculating__choose-item_active');

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
    
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                // Находим ближайший родительский элемент, соответствующий селектору
                const parentElement = e.target.closest(selector);
    
                // Если родительский элемент найден, переключаем активный класс
                if (parentElement) {
                    figure = parentElement.getAttribute('id');
                    localStorage.setItem('figure', parentElement.getAttribute('id'));
    
                    // Удаляем активный класс у всех элементов
                    elements.forEach(item => {
                        item.classList.remove(activeClass);
                    });
    
                    // Добавляем активный класс только родительскому элементу
                    parentElement.classList.add(activeClass);
    
                    calcTotal();
                }
            });
        });
    }
    

    getStaticInformation('.calculating__choose-item', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = 'none';
            }
            side = +input.value;

            calcTotal();
        });
    }

    getDynamicInformation('#square_side');
}

function calcRectangle() {
    const resultPerimeter = document.querySelector('#result_rectangle_perimeter');
    const resultArea = document.querySelector('#result_rectangle_area');
    
    let figure, width, height;

    if (localStorage.getItem('figure')) {
        figure = localStorage.getItem('figure');
    } else {
        figure = 'rectangle';
        localStorage.setItem('figure', 'rectangle');
    }

    function calcTotal() {
        if (!figure || figure != 'rectangle' || !width || !height) {
            resultPerimeter.textContent = '____';
            resultArea.textContent = '____';
            return;
        }
        else {
            resultPerimeter.textContent = (width + height) * 2;
            resultArea.textContent = width * height;
        }
    }

    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('figure')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('.calculating__choose-item', 'calculating__choose-item_active');

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
    
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                // Находим ближайший родительский элемент, соответствующий селектору
                const parentElement = e.target.closest(selector);
    
                // Если родительский элемент найден, переключаем активный класс
                if (parentElement) {
                    figure = parentElement.getAttribute('id');
                    localStorage.setItem('figure', parentElement.getAttribute('id'));
    
                    // Удаляем активный класс у всех элементов
                    elements.forEach(item => {
                        item.classList.remove(activeClass);
                    });
    
                    // Добавляем активный класс только родительскому элементу
                    parentElement.classList.add(activeClass);
    
                    calcTotal();
                }
            });
        });
    }
    

    getStaticInformation('.calculating__choose-item', 'calculating__choose-item_active');

    function getDynamicInformation(widthSelector, heightSelector) {
        const inputWidth = document.querySelector(widthSelector);
        const inputHeight = document.querySelector(heightSelector);

        inputWidth.addEventListener('input', () => {
            if (inputWidth.value.match(/\D/g)) {
                inputWidth.style.border = "1px solid red";
            } else {
                inputWidth.style.border = 'none';
            }
            width = +inputWidth.value;

            calcTotal();
        });

        inputHeight.addEventListener('input', () => {
            if (inputHeight.value.match(/\D/g)) {
                inputHeight.style.border = "1px solid red";
            } else {
                inputHeight.style.border = 'none';
            }
            height = +inputHeight.value;

            calcTotal();
        });
    }

    getDynamicInformation('#rectangle_width', '#rectangle_height');
}

function calcTriangle() {
    const resultPerimeter = document.querySelector('#result_triangle_perimeter');
    const resultArea = document.querySelector('#result_triangle_area');
    
    let figure, leg1, leg2;

    if (localStorage.getItem('figure')) {
        figure = localStorage.getItem('figure');
    } else {
        figure = 'triangle';
        localStorage.setItem('figure', 'triangle');
    }

    function calcTotal() {
        if (!figure || figure != 'triangle' || !leg1 || !leg2) {
            resultPerimeter.textContent = '____';
            resultArea.textContent = '____';
            return;
        }
        else {
            resultPerimeter.textContent = (leg1 + leg2) + parseFloat(Math.sqrt((leg1 ** 2) + (leg2 ** 2)).toFixed(1));
            resultArea.textContent = (leg1 * leg2) / 2;
        }
    }

    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('figure')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('.calculating__choose-item', 'calculating__choose-item_active');

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
    
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                // Находим ближайший родительский элемент, соответствующий селектору
                const parentElement = e.target.closest(selector);
    
                // Если родительский элемент найден, переключаем активный класс
                if (parentElement) {
                    figure = parentElement.getAttribute('id');
                    localStorage.setItem('figure', parentElement.getAttribute('id'));
    
                    // Удаляем активный класс у всех элементов
                    elements.forEach(item => {
                        item.classList.remove(activeClass);
                    });
    
                    // Добавляем активный класс только родительскому элементу
                    parentElement.classList.add(activeClass);
    
                    calcTotal();
                }
            });
        });
    }
    

    getStaticInformation('.calculating__choose-item', 'calculating__choose-item_active');

    function getDynamicInformation(leg1Selector, leg2Selector) {
        const inputLeg1 = document.querySelector(leg1Selector);
        const inputLeg2 = document.querySelector(leg2Selector);

        inputLeg1.addEventListener('input', () => {
            if (inputLeg1.value.match(/\D/g)) {
                inputLeg1.style.border = "1px solid red";
            } else {
                inputLeg1.style.border = 'none';
            }
            leg1 = +inputLeg1.value;

            calcTotal();
        });

        inputLeg2.addEventListener('input', () => {
            if (inputLeg2.value.match(/\D/g)) {
                inputLeg2.style.border = "1px solid red";
            } else {
                inputLeg2.style.border = 'none';
            }
            leg2 = +inputLeg2.value;

            calcTotal();
        });
    }

    getDynamicInformation('#triangle_leg_1', '#triangle_leg_2');
}

function calcCircle() {
    const resultPerimeter = document.querySelector('#result_circle_perimeter');
    const resultArea = document.querySelector('#result_circle_area');
    
    let figure, radius;

    if (localStorage.getItem('figure')) {
        figure = localStorage.getItem('figure');
    } else {
        figure = 'circle';
        localStorage.setItem('figure', 'circle');
    }

    function calcTotal() {
        if (!figure || figure != 'circle' || !radius) {
            resultPerimeter.textContent = '____';
            resultArea.textContent = '____';
            return;
        }
        else {
            resultPerimeter.textContent = (radius * Math.PI * 2).toFixed(1);
            resultArea.textContent = (Math.PI * (radius ** 2)).toFixed(1);
        }
    }

    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('figure')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('.calculating__choose-item', 'calculating__choose-item_active');

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
    
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                // Находим ближайший родительский элемент, соответствующий селектору
                const parentElement = e.target.closest(selector);
    
                // Если родительский элемент найден, переключаем активный класс
                if (parentElement) {
                    figure = parentElement.getAttribute('id');
                    localStorage.setItem('figure', parentElement.getAttribute('id'));
    
                    // Удаляем активный класс у всех элементов
                    elements.forEach(item => {
                        item.classList.remove(activeClass);
                    });
    
                    // Добавляем активный класс только родительскому элементу
                    parentElement.classList.add(activeClass);
    
                    calcTotal();
                }
            });
        });
    }
    
    getStaticInformation('.calculating__choose-item', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = 'none';
            }
            radius = +input.value;

            calcTotal();
        });
    }

    getDynamicInformation('#radius');
}

window.addEventListener('DOMContentLoaded', function() {
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    tabs('.calculating__choose-item', '.tabcontent__dimensions', '.tabcontent', 'calculating__choose-item_active');
    calcSquare();
    calcRectangle();
    calcTriangle();
    calcCircle();
});