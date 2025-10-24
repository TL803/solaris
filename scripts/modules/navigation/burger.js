document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMainMenu = document.getElementById('mobile-main-menu');
    const mobileModelsMenu = document.getElementById('mobile-models-menu');
    const openMobileModelsBtn = document.querySelector('[data-open-mobile-models]');
    const mobileModelsBackBtn = document.getElementById('mobile-models-back');

    // Открытие/закрытие мобильного меню
    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
        // При открытии меню показываем основное меню
        if (!mobileMenu.classList.contains('hidden')) {
            showMainMenu();
        }
    });

    // Открытие меню моделей
    openMobileModelsBtn.addEventListener('click', function () {
        showModelsMenu();
    });

    // Возврат к основному меню
    mobileModelsBackBtn.addEventListener('click', function () {
        showMainMenu();
    });

    // Функция показа основного меню
    function showMainMenu() {
        mobileMainMenu.classList.remove('hidden');
        mobileModelsMenu.classList.add('hidden');
    }

    // Функция показа меню моделей
    function showModelsMenu() {
        mobileMainMenu.classList.add('hidden');
        mobileModelsMenu.classList.remove('hidden');
    }

    // Закрытие меню при клике вне области
    document.addEventListener('click', function (event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            showMainMenu(); // Сбрасываем к основному меню при закрытии
        }
    });

    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            if (!mobileModelsMenu.classList.contains('hidden')) {
                // Если открыто меню моделей - возвращаемся к основному
                showMainMenu();
            } else {
                // Если открыто основное меню - закрываем всё
                mobileMenu.classList.add('hidden');
            }
        }
    });
});