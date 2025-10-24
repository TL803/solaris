document.addEventListener("DOMContentLoaded", () => {
    const cars = [
        {
            id: 1,
            title: 'Solaris HC',
            engine: '2.0(149,6 л.с.)',
            drive: '4WD',
            price: '1 819 000',
            monthlyPayment: '11 444',
            img: '../assets/auto/Rectangle 243.png',
            link: 'avaliableauto.html'
        },
        {
            id: 2,
            title: 'Solaris HC',
            engine: '2.0(149,6 л.с.)',
            drive: '4WD',
            price: '1 819 000',
            monthlyPayment: '11 444',
            img: '../assets/auto/Rectangle 243.png',
            link: 'avaliableauto.html'
        },
        {
            id: 3,
            title: 'Solaris HC',
            engine: '2.0(149,6 л.с.)',
            drive: '4WD',
            price: '1 819 000',
            monthlyPayment: '11 444',
            img: '../assets/auto/Rectangle 243.png',
            link: 'avaliableauto.html'
        },
        {
            id: 4,
            title: 'Solaris HC',
            engine: '2.0(149,6 л.с.)',
            drive: '4WD',
            price: '1 819 000',
            monthlyPayment: '11 444',
            img: '../assets/auto/Rectangle 243.png',
            link: 'avaliableauto.html'
        }
    ];

    let isMobileView = window.innerWidth < 768;

    // === ФУНКЦИЯ РЕНДЕРА КАРТОЧКИ ===
    function createSimpleCarCard(car, index) {
        return `
            <div class="flex flex-col items-center text-center bg-white p-4 rounded-lg w-full max-w-[300px] mx-auto">
                <h3 class="text-xl font-bold text-gray-800 mb-1">${car.title}</h3>
                <p class="text-sm text-gray-600 mb-2">${car.engine} ${car.drive}</p>
                <p class="text-lg font-semibold text-gray-900 mb-1">ОТ ${car.price} ₽</p>
                <p class="text-xs text-gray-500 mb-4">Платеж от ${car.monthlyPayment} ₽/месяц</p>
                <div class="w-full h-32 sm:h-40 md:h-48 mb-4">
                    <img src="${car.img}" alt="${car.title}" class="object-contain w-full h-full">
                </div>
                <button class="w-full py-2 px-4 bg-gradient-to-r from-blue-900 to-blue-500 text-white font-medium rounded-lg hover:from-blue-800 hover:to-blue-400 transition">
                    О модели
                </button>
            </div>
        `;
    }

    // === РЕНДЕР КАРТОЧЕК ===
    function renderCarCards() {
        const cardsContainer = document.querySelector('[data-cars-comparison]');
        if (!cardsContainer) return;

        isMobileView = window.innerWidth < 768;

        if (isMobileView) {
            cardsContainer.className = 'grid grid-cols-2 gap-4 mb-10';
        } else {
            cardsContainer.className = 'grid grid-cols-1 md:grid-cols-4 gap-4 mb-10';
        }

        cardsContainer.innerHTML = cars.map((car, index) => 
            createSimpleCarCard(car, index)
        ).join('');
    }

    // === ОБРАБОТКА РЕСАЙЗА ===
    function handleResize() {
        const newIsMobileView = window.innerWidth < 768;
        if (newIsMobileView !== isMobileView) {
            isMobileView = newIsMobileView;
            renderCarCards();
        }
    }

    // === ИНИЦИАЛИЗАЦИЯ ===
    renderCarCards();
    window.addEventListener('resize', handleResize);
});