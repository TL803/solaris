// scripts/main.js
(function() {
    'use strict';
    
    // Функция для безопасного получения элемента
    const getElement = (selector) => {
        const element = typeof selector === 'string' 
            ? document.querySelector(selector) 
            : selector;
        return element || null;
    };
    
    // Переключение сайдбара
    const initSidebarToggle = () => {
        const toggleSidebar = getElement('#toggle-sidebar');
        const sideBar = getElement('#sidebar');
        const mainContent = getElement('.flex-1');
        
        if (!toggleSidebar || !sideBar || !mainContent) {
            console.warn('Sidebar elements not found');
            return;
        }
        
        toggleSidebar.addEventListener('click', () => {
            const isHidden = sideBar.classList.contains('sidebar-hidden');
            
            if (isHidden) {
                // Показываем sidebar
                sideBar.classList.remove('sidebar-hidden');
                mainContent.classList.remove('sidebar-hidden');
                toggleSidebar.innerHTML = '<i class="fas fa-sliders-h mr-2"></i>Скрыть параметры';
            } else {
                // Скрываем sidebar
                sideBar.classList.add('sidebar-hidden');
                mainContent.classList.add('sidebar-hidden');
                toggleSidebar.innerHTML = '<i class="fas fa-sliders-h mr-2"></i>Показать параметры';
            }
        });
    };
    
    // Мобильное меню
    const initMobileMenu = () => {
        const mobileMenuButton = getElement('#mobile-menu-button');
        const mobileMenu = getElement('#mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    };
    
    // Аккордеон фильтров (единая версия)
    const initFilterAccordions = () => {
        const toggles = document.querySelectorAll('[data-toggle-filter]');
        
        toggles.forEach(toggle => {
            const key = toggle.dataset.toggleFilter;
            const content = document.querySelector(`[data-toggle-content="${key}"]`);
            const icon = toggle.querySelector('i');
            
            if (!content) {
                console.warn(`Content not found for filter: ${key}`);
                return;
            }
            
            // Инициализация - закрытое состояние
            content.style.maxHeight = '0px';
            content.style.opacity = '0';
            content.style.visibility = 'hidden';
            
            toggle.addEventListener('click', () => {
                const isOpen = content.classList.contains('filter-content--open');
                
                if (isOpen) {
                    // Закрываем
                    content.style.maxHeight = content.scrollHeight + 'px';
                    
                    requestAnimationFrame(() => {
                        content.style.maxHeight = '0px';
                        content.style.opacity = '0';
                        content.classList.remove('filter-content--open');
                        
                        if (icon) {
                            icon.className = 'fas fa-plus text-blue-600';
                        }
                    });
                } else {
                    // Открываем
                    content.style.maxHeight = '0px';
                    content.classList.add('filter-content--open');
                    content.style.opacity = '1';
                    content.style.visibility = 'visible';
                    
                    if (icon) {
                        icon.className = 'fas fa-minus text-blue-600';
                    }
                    
                    requestAnimationFrame(() => {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    });
                }
                
                // После анимации
                const onTransitionEnd = () => {
                    if (content.classList.contains('filter-content--open')) {
                        content.style.maxHeight = 'auto';
                    } else {
                        content.style.visibility = 'hidden';
                    }
                    content.removeEventListener('transitionend', onTransitionEnd);
                };
                
                content.addEventListener('transitionend', onTransitionEnd);
            });
        });
    };
    
    // Форматирование чисел
    const initNumberFormatting = () => {
        const inputs = document.querySelectorAll('input[type="text"]');
        
        inputs.forEach(input => {
            // Добавляем обработчик только к инпутам, которые должны форматировать числа
            if (input.classList.contains('price-input') || 
                input.parentElement?.parentElement?.querySelector('label')?.textContent?.includes('цена') ||
                input.previousElementSibling?.textContent?.includes('цена')) {
                
                input.addEventListener('input', function() {
                    this.value = this.value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                });
            }
        });
    };
    
    // Инициализация всех модулей
    const initAll = () => {
        try {
            initSidebarToggle();
            initMobileMenu();
            initFilterAccordions();
            initNumberFormatting();
            console.log('All modules initialized successfully');
        } catch (error) {
            console.error('Initialization error:', error);
        }
    };
    
    // Запуск когда DOM готов
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }
    
})();