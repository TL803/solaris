const avaliableCarsContainer = document.querySelector('[data-avaliable-cars-container]');
const showMoreButton = document.getElementById('show-more-btn');
const carsCountElement = document.getElementById('cars-count');

// Заменяем данные на те, что на картинке — Solaris HC, 2.0(149,6 л.с.) 4WD, цена 1 819 000, платеж 11 444
const cars = [
    {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    },
    {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    }, {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    }, {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    }, {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    }, {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    }, {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    }, {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    }, {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    }, {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    }, {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    }, {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    }, {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    }, {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    }, {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    }, {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    }, {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    }, {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    }, {
        status: 'В пути',
        img: '../assets/auto/Rectangle 243.png', // замените на реальный путь к оранжевой машине
        title: 'Solaris HC',
        engine: '2.0(149,6 л.с.)',
        drive: '4WD',
        price: '1 819 000',
        monthlyPayment: '11 444',
        link: 'avaliableauto.html'
    },
];

let currentPage = 1;
let carsPerPage = 0;

function calculateCarsPerPage() {
    const width = window.innerWidth;
    if (width >= 1536) return 8;
    if (width >= 1280) return 6;
    if (width >= 1024) return 4;
    if (width >= 640) return 4;
    return 2;
}

function getStatusColor(status) {
    switch (status) {
        case 'В наличии':
            return 'text-green-800 bg-green-100';
        case 'В пути':
            return 'text-orange-800 bg-orange-100';
        case 'Забронировано':
            return 'text-red-800 bg-red-100';
        default:
            return 'text-gray-800 bg-gray-100';
    }
}

function createCarCard(car) {
    const carElement = document.createElement('div');
    // Увеличенные внутренние отступы
    carElement.className = 'bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 flex flex-col hover:shadow-md transition-shadow duration-300';

    const engineDrive = `${car.engine} ${car.drive}`;

    carElement.innerHTML = `
        <!-- Статус -->
        <div class="mb-3">
            <span class="inline-block px-3 py-1 text-[14px] font-regular ${getStatusColor(car.status)} rounded-lg">
                ${car.status}
            </span>
        </div>

        <!-- Название модели -->
        <h3 class="text-2xl sm:text-[36px] font-normal text-[#363636] mb-2 cursor-pointer" 
            onclick="window.location.href='./${car.link}'">${car.title}</h3>

        <!-- Двигатель и привод -->
        <p class="text-medium sm:text-[13px] text-[#282624] mb-2 cursor-pointer" 
           onclick="window.location.href='./${car.link}'">${engineDrive}</p>

        <!-- Цена -->
        <div class="text-xl sm:text-2xl font-normal text-gray-900 mb-2 cursor-pointer" 
             onclick="window.location.href='./${car.link}'">От ${car.price} ₽</div>

        <!-- Платеж -->
        <div class=" text-[#363636CC] mb-5 cursor-pointer" 
             onclick="window.location.href='./${car.link}'">Платеж от ${car.monthlyPayment} ₽/месяц</div>

        <!-- Изображение -->
        <div class="mb-5 cursor-pointer overflow-hidden rounded-lg" onclick="window.location.href='./${car.link}'">
            <img src="${car.img}" alt="${car.title}"
                 class="w-full h-40 sm:h-48 md:h-56 object-contain" />
        </div>

        <!-- Кнопка "ПОДРОБНЕЕ" с градиентом -->
        <button type="button"
                class="w-full py-3.5 px-4 bg-gradient-to-r from-[#20365A] to-[#418FDE] text-white text-center text-base sm:text-lg font-medium rounded-lg transition-all duration-300"
                onclick="window.location.href='./${car.link}'">
            ПОДРОБНЕЕ
        </button>
    `;

    return carElement;
}

function displayCars() {
    const endIndex = currentPage * carsPerPage;
    const carsToShow = cars.slice(0, endIndex);

    avaliableCarsContainer.innerHTML = '';

    carsToShow.forEach(car => {
        const carElement = createCarCard(car);
        avaliableCarsContainer.appendChild(carElement);
    });

    updateCarsCount();

    if (endIndex >= cars.length) {
        showMoreButton.style.display = 'none';
    } else {
        showMoreButton.style.display = 'block';
    }
}

function updateCarsCount() {
    const displayedCars = Math.min(currentPage * carsPerPage, cars.length);
    carsCountElement.textContent = `${cars.length} (показано ${displayedCars})`;
}

function loadMoreCars() {
    currentPage++;
    displayCars();
}

document.addEventListener('DOMContentLoaded', function () {
    carsPerPage = calculateCarsPerPage();
    displayCars();

    showMoreButton.addEventListener('click', loadMoreCars);

    window.addEventListener('resize', function () {
        const newCarsPerPage = calculateCarsPerPage();
        if (newCarsPerPage !== carsPerPage) {
            carsPerPage = newCarsPerPage;
            currentPage = 1;
            displayCars();
        }
    });
});