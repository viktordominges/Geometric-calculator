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

window.addEventListener('DOMContentLoaded', function() {
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    tabs('.calculating__choose-item', '.tabcontent__dimensions', '.tabcontent', 'calculating__choose-item_active');
    calcSquare();
});