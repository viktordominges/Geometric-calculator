export function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass, storageKey = 'figure') {
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