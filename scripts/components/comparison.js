document.addEventListener("DOMContentLoaded", () => {
    const cars = [
        {
            id: 1,
            status: 'В пути', // можно оставить для логики, но визуально не отображаем
            statusColor: 'amber',
            img: '../assets/auto/Rectangle 243.png', // оранжевая машина, как на картинке
            title: 'Solaris HC',
            complectation: '', // не отображается на картинке
            engine: '2.0(149,6 л.с.)',
            transmission: '', // не отображается
            drive: '4WD',
            price: '1 819 000',
            monthlyPayment: '11 444',
            adress: '', // не отображается
            link: 'avaliableauto.html',
            characteristics: {
                engine: '2.0(149,6 л.с.)',
                transmission: '',
                power: '149,6 л.с.',
                code: '',
                equipment: '',
                year: '',
                engineType: 'Бензиновый',
                volume: '2.0 л',
                torque: '',
                transmissionType: '',
                gears: '',
                driveType: 'Полный',
                headlights: '',
                rearLights: '',
                wheels: '',
                interior: '',
                climate: '',
                multimedia: '',
                airbags: '',
                abs: '',
                esp: '',
                camera: '',
                seatHeating: '',
                seatControl: '',
                cruise: '',
                screen: '',
                navigation: '',
                audio: '',
                carplay: ''
            }
        },
        {
            id: 2,
            status: 'В пути',
            statusColor: 'amber',
            img: '../assets/auto/Rectangle 243.png',
            title: 'Solaris HC',
            complectation: '',
            engine: '2.0(149,6 л.с.)',
            transmission: '',
            drive: '4WD',
            price: '1 819 000',
            monthlyPayment: '11 444',
            adress: '',
            link: 'avaliableauto.html',
            characteristics: {
                engine: '2.0(149,6 л.с.)',
                transmission: '',
                power: '149,6 л.с.',
                code: '',
                equipment: '',
                year: '',
                engineType: 'Бензиновый',
                volume: '2.0 л',
                torque: '',
                transmissionType: '',
                gears: '',
                driveType: 'Полный',
                headlights: '',
                rearLights: '',
                wheels: '',
                interior: '',
                climate: '',
                multimedia: '',
                airbags: '',
                abs: '',
                esp: '',
                camera: '',
                seatHeating: '',
                seatControl: '',
                cruise: '',
                screen: '',
                navigation: '',
                audio: '',
                carplay: ''
            }
        },
        {
            id: 3,
            status: 'В пути',
            statusColor: 'amber',
            img: '../assets/auto/Rectangle 243.png',
            title: 'Solaris HC',
            complectation: '',
            engine: '2.0(149,6 л.с.)',
            transmission: '',
            drive: '4WD',
            price: '1 819 000',
            monthlyPayment: '11 444',
            adress: '',
            link: 'avaliableauto.html',
            characteristics: {
                engine: '2.0(149,6 л.с.)',
                transmission: '',
                power: '149,6 л.с.',
                code: '',
                equipment: '',
                year: '',
                engineType: 'Бензиновый',
                volume: '2.0 л',
                torque: '',
                transmissionType: '',
                gears: '',
                driveType: 'Полный',
                headlights: '',
                rearLights: '',
                wheels: '',
                interior: '',
                climate: '',
                multimedia: '',
                airbags: '',
                abs: '',
                esp: '',
                camera: '',
                seatHeating: '',
                seatControl: '',
                cruise: '',
                screen: '',
                navigation: '',
                audio: '',
                carplay: ''
            }
        },
        {
            id: 4,
            status: 'В пути',
            statusColor: 'amber',
            img: '../assets/auto/Rectangle 243.png',
            title: 'Solaris HC',
            complectation: '',
            engine: '2.0(149,6 л.с.)',
            transmission: '',
            drive: '4WD',
            price: '1 819 000',
            monthlyPayment: '11 444',
            adress: '',
            link: 'avaliableauto.html',
            characteristics: {
                engine: '2.0(149,6 л.с.)',
                transmission: '',
                power: '149,6 л.с.',
                code: '',
                equipment: '',
                year: '',
                engineType: 'Бензиновый',
                volume: '2.0 л',
                torque: '',
                transmissionType: '',
                gears: '',
                driveType: 'Полный',
                headlights: '',
                rearLights: '',
                wheels: '',
                interior: '',
                climate: '',
                multimedia: '',
                airbags: '',
                abs: '',
                esp: '',
                camera: '',
                seatHeating: '',
                seatControl: '',
                cruise: '',
                screen: '',
                navigation: '',
                audio: '',
                carplay: ''
            }
        }
    ];

    let currentCarIndexes = [0, 1];
    let isMobileView = window.innerWidth < 1280;

    // === ФУНКЦИИ РЕНДЕРА ===

    function createCarCard(car, index) {
        const statusColors = {
            'amber': { text: 'text-orange-800', bg: 'bg-orange-100' },
            'green': { text: 'text-green-800', bg: 'bg-green-100' }
        };
        const colors = statusColors[car.statusColor] || statusColors.amber;

        return `
<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 flex flex-col hover:shadow-md transition-shadow duration-300 cursor-pointer" data-car-index="${index}" onclick="window.location.href='./${car.link}'">
    <div class="mb-2 sm:mb-3">
        <span class="inline-block px-2.5 py-1 text-xs sm:text-[14px] font-medium ${colors.text} ${colors.bg} rounded-lg">
            ${car.status}
        </span>
    </div>

    <h3 class="text-xl sm:text-2xl md:text-[36px] font-normal text-[#363636] mb-1 truncate">${car.title}</h3>

    <p class="text-xs sm:text-[13px] text-[#282624] mb-2">${car.engine} ${car.drive}</p>

    <div class="text-xs sm:text-xl md:text-2xl font-normal text-gray-900 mb-1">От ${car.price} ₽</div>

    <div class="text-[#363636CC] text-xs sm:text-[13px] mb-4 sm:mb-5">Платеж от ${car.monthlyPayment} ₽/месяц</div>

    <div class="mb-4 sm:mb-5 overflow-hidden rounded-lg flex-shrink-0">
        <img src="${car.img}" alt="${car.title}" class="w-full h-32 sm:h-40 md:h-48 object-contain" />
    </div>

    <button type="button"
            class="w-full py-3 px-4 sm:py-3.5 sm:px-4 bg-gradient-to-r from-[#20365A] to-[#418FDE] text-white text-center text-sm sm:text-base font-medium rounded-lg transition-all duration-300 mt-auto"
            onclick="event.stopPropagation(); window.location.href='./${car.link}'">
        О МОДЕЛИ
    </button>
</div>
        `;
    }

    function createSlider(index) {
        const currentCarIndex = currentCarIndexes[index];
        return `
            <div class="slider-container mt-4" data-slider-index="${index}">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center bg-white border border-gray-300 rounded-full px-2 py-1">
                        <button class="slider-prev p-2 rounded-full hover:bg-gray-50 transition" data-index="${index}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <span class="text-xs text-gray-500 px-2">${currentCarIndex + 1} из ${cars.length}</span>
                        <button class="slider-next p-2 rounded-full hover:bg-gray-50 transition" data-index="${index}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // === АККОРДЕОН И ХАРАКТЕРИСТИКИ ===

    function createCharacteristicSection(sectionName, characteristics) {
        return `
            <div class="comparison-section border border-gray-200 rounded-lg overflow-hidden mb-6 shadow-sm">
                <button class="bg-gray-50 px-6 py-4 font-semibold text-gray-900 border-b border-gray-300 w-full text-left flex justify-between items-center" onclick="toggleAccordion(this)">
                    ${sectionName}
                    <i class="fas fa-plus text-gray-500"></i>
                </button>
                <div class="bg-white hidden">
                    <div class="divide-y divide-gray-200">
                        ${characteristics.map(char => createCharacteristicRow(char.name, char.key)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    function createCharacteristicRow(characteristicName, characteristicKey, isFirst = false) {
        let values;
        if (isMobileView) {
            values = currentCarIndexes.map(index => cars[index].characteristics[characteristicKey]);
        } else {
            values = cars.map(car => car.characteristics[characteristicKey]);
        }

        const colClass = isMobileView 
            ? 'grid-cols-[1fr_1fr]' 
            : 'grid-cols-[1fr_1fr_1fr_1fr]';

        return `
            <div class="grid ${colClass} gap-0 py-3 px-6 hover:bg-gray-50 transition-colors duration-150 items-center">
                <div class="font-medium text-gray-700 py-2 border-r border-gray-200 pr-4">${characteristicName}</div>
                <div class="font-medium text-gray-700 py-2 border-r border-gray-200 pr-4"></div>
                <div class="font-medium text-gray-700 py-2 border-r border-gray-200 pr-4"></div>
                <div class="font-medium text-gray-700 py-2 border-r border-gray-200 pr-4"></div>
                ${values.map((value, index) => `
                    <div class="text-gray-900 py-2 px-4 text-end ${
                        index < values.length - 1 ? 'border-r border-gray-200' : ''
                    }">${value || '—'}</div>
                `).join('')}
            </div>
            ${!isFirst ? '<div class="h-px bg-gray-200 mx-6"></div>' : ''}
        `;
    }

    function updateComparisonTable() {
        const sections = {
            'Основное': [
                { name: 'Двигатель', key: 'engine' },
                { name: 'Трансмиссия', key: 'transmission' },
                { name: 'Мощность', key: 'power' },
                { name: 'Код', key: 'code' },
                { name: 'Комплектация', key: 'equipment' },
                { name: 'Год выпуска', key: 'year' }
            ],
            'Двигатель': [
                { name: 'Тип двигателя', key: 'engineType' },
                { name: 'Объем', key: 'volume' },
                { name: 'Мощность', key: 'power' },
                { name: 'Крутящий момент', key: 'torque' }
            ],
            'Трансмиссия': [
                { name: 'Тип', key: 'transmissionType' },
                { name: 'Количество передач', key: 'gears' },
                { name: 'Привод', key: 'driveType' }
            ],
            'Экстерьер': [
                { name: 'Тип фар', key: 'headlights' },
                { name: 'Задние фонари', key: 'rearLights' },
                { name: 'Диски', key: 'wheels' }
            ],
            'Интерьер': [
                { name: 'Отделка салона', key: 'interior' },
                { name: 'Климат-контроль', key: 'climate' },
                { name: 'Мультимедийная система', key: 'multimedia' }
            ],
            'Безопасность': [
                { name: 'Подушки безопасности', key: 'airbags' },
                { name: 'ABS', key: 'abs' },
                { name: 'ESP', key: 'esp' },
                { name: 'Камера заднего вида', key: 'camera' }
            ],
            'Комфорт': [
                { name: 'Климат-контроль', key: 'climate' },
                { name: 'Подогрев сидений', key: 'seatHeating' },
                { name: 'Электропривод сидений', key: 'seatControl' },
                { name: 'Круиз-контроль', key: 'cruise' }
            ],
            'Мультимедиа': [
                { name: 'Экран', key: 'screen' },
                { name: 'Навигация', key: 'navigation' },
                { name: 'Аудиосистема', key: 'audio' },
                { name: 'Apple CarPlay / Android Auto', key: 'carplay' }
            ]
        };

        const comparisonTable = document.getElementById('comparison-table');
        if (!comparisonTable) return;

        const sectionsHTML = Object.keys(sections).map(sectionName => 
            createCharacteristicSection(sectionName, sections[sectionName])
        ).join('');

        comparisonTable.innerHTML = sectionsHTML;
    }

    // === РЕНДЕР КАРТОЧЕК ===

    function renderCarCards() {
        const cardsContainer = document.querySelector('[data-cars-comparison]');
        if (!cardsContainer) return;

        isMobileView = window.innerWidth < 1280;

        if (isMobileView) {
            cardsContainer.className = 'grid grid-cols-2 gap-6 mb-10 sticky top-0';
            if (cardsContainer.children.length !== 2) {
                cardsContainer.innerHTML = '';
                for (let i = 0; i < 2; i++) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'car-slider-wrapper';
                    cardsContainer.appendChild(wrapper);
                }
            }

            const wrappers = cardsContainer.querySelectorAll('.car-slider-wrapper');
            wrappers.forEach((wrapper, index) => {
                wrapper.innerHTML = `
                    ${createCarCard(cars[currentCarIndexes[index]], index)}
                    ${createSlider(index)}
                `;
            });

        } else {
            cardsContainer.className = 'grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 sticky bg-white top-0';
            cardsContainer.innerHTML = cars.map((car, index) => 
                createCarCard(car, index)
            ).join('');
        }

        addSliderEventListeners();
    }

    // === СЛАЙДЕРЫ ===

    function addSliderEventListeners() {
        if (!isMobileView) return;

        document.querySelectorAll('.slider-prev').forEach(button => {
            button.removeEventListener('click', sliderPrevHandler);
            button.addEventListener('click', sliderPrevHandler);
        });

        document.querySelectorAll('.slider-next').forEach(button => {
            button.removeEventListener('click', sliderNextHandler);
            button.addEventListener('click', sliderNextHandler);
        });
    }

    function sliderPrevHandler(e) {
        const sliderIndex = parseInt(e.target.closest('.slider-prev').dataset.index);
        navigateSlider(sliderIndex, -1);
    }

    function sliderNextHandler(e) {
        const sliderIndex = parseInt(e.target.closest('.slider-next').dataset.index);
        navigateSlider(sliderIndex, 1);
    }

    function navigateSlider(sliderIndex, direction) {
        let newIndex = currentCarIndexes[sliderIndex] + direction;
        if (newIndex < 0) newIndex = cars.length - 1;
        if (newIndex >= cars.length) newIndex = 0;
        selectCar(sliderIndex, newIndex);
    }

    function selectCar(sliderIndex, carIndex) {
        const otherIndex = sliderIndex === 0 ? 1 : 0;
        if (currentCarIndexes[otherIndex] === carIndex) return;
        currentCarIndexes[sliderIndex] = carIndex;
        renderCarCards();
        updateComparisonTable();
    }

    // === АККОРДЕОН ===

    window.toggleAccordion = function(button) {
        const content = button.nextElementSibling;
        const icon = button.querySelector('i');
        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            icon.classList.replace('fa-plus', 'fa-minus');
        } else {
            content.classList.add('hidden');
            icon.classList.replace('fa-minus', 'fa-plus');
        }
    };

    // === ТАБЫ ===

    window.switchTab = function(tab) {
        const sections = document.querySelectorAll('.comparison-section');
        sections.forEach(section => {
            const title = section.querySelector('button').textContent.trim();
            const shouldShow = 
                (tab === 'standard' && ['Основное', 'Интерьер', 'Безопасность', 'Комфорт', 'Мультимедиа'].includes(title)) ||
                (tab === 'technical' && ['Двигатель', 'Трансмиссия', 'Экстерьер'].includes(title));
            
            section.classList.toggle('hidden', !shouldShow);

            // Если секция скрыта — закрываем её содержимое
            if (!shouldShow) {
                const content = section.querySelector('.bg-white');
                const icon = section.querySelector('i');
                if (content && !content.classList.contains('hidden')) {
                    content.classList.add('hidden');
                    icon.classList.replace('fa-minus', 'fa-plus');
                }
            }
        });
    };

    // === РЕСАЙЗ ===

    function handleResize() {
        const newIsMobileView = window.innerWidth < 1280;
        if (newIsMobileView !== isMobileView) {
            isMobileView = newIsMobileView;
            if (isMobileView) currentCarIndexes = [0, 1];
            renderCarCards();
            updateComparisonTable();
        }
    }

    // === ИНИЦИАЛИЗАЦИЯ ===

    renderCarCards();
    updateComparisonTable();
    window.addEventListener('resize', handleResize);
});