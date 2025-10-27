document.addEventListener('DOMContentLoaded', function () {
    const carData = {
        T77: {
            'PRESTIGE PLUS (ДСТ) B70': 2036000,
            'COMFORT (МКПП)': 1850000,
        },
        T90: {
            'SPORT EDITION 1.5T': 2450000,
            'LUXURY 2.0T': 2790000,
        }
    };

    let selectedModel = null;
    let carPrice = 0;
    const interestRate = 12;

    // DOM
    const modelSelect = document.querySelector('[data-select-model]');
    const trimSelect = document.querySelector('[data-select-trim]');
    const conditionalForm = document.getElementById('conditionalForm');
    const conditionalOffer = document.getElementById('conditionalOffer');

    const carPriceDisplay = document.getElementById('carPriceDisplay');
    const carImageDisplay = document.getElementById('carImageDisplay');
    const carImage = document.createElement('img');
    carImage.id = 'car-image';
    carImage.className = 'w-full h-auto max-h-64 object-contain rounded-lg';

    const carModelTitle = document.getElementById('carModelTitle');
    const carSpecs = document.getElementById('carSpecs');
    const originalPriceEl = document.getElementById('originalPrice');
    const finalPriceEl = document.getElementById('finalPrice');
    const examplePaymentEl = document.getElementById('examplePayment');

    const downSlider = document.getElementById('downPaymentSliderDesktop');
    const downAmountEl = document.getElementById('downPaymentAmountDesktop');
    const downPercentEl = document.getElementById('downPaymentPercentDesktop');
    const downTrack = document.getElementById('downPaymentTrack');
    const downDisplayEl = document.getElementById('downPaymentDisplay');

    const termSlider = document.getElementById('loanTermSliderDesktop');
    const termYearsEl = document.getElementById('loanTermYearsDesktop');
    const termTrack = document.getElementById('loanTermTrack');
    const termDisplayEl = document.getElementById('loanTermDisplay');

    const creditAmountEl = document.getElementById('creditAmount');
    const monthlyPaymentEl = document.getElementById('monthlyPaymentDisplay');

    const termButtons = document.querySelectorAll('[data-term]');

    // === ЦВЕТА ===
    const colors = [
        { name: "Rectangle 248.png", hex: "#FFFFFF" },
        { name: "Rectangle 249.png", hex: "#949494" },
        { name: "Rectangle 250.png", hex: "#000000" },
        { name: "Rectangle 251.png", hex: "#BFBFBF" },
        { name: "Rectangle 252.png", hex: "#FFA500" }
    ];

    let activeColorElem = null;

    function initColorPicker() {
        const colorContainer = document.getElementById('colors-container');
        if (!colorContainer) return;
    
        colorContainer.innerHTML = '';
    
        // Определяем цвета только для визуального отображения (квадратиков)
        const colors = [
            { hex: "#FFFFFF" },   // Белый
            { hex: "#949494" },   // Серый
            { hex: "#000000" },   // Чёрный
            { hex: "#BFBFBF" },   // Светло-серый
            { hex: "#FFA500" }    // Оранжевый (или любой другой)
        ];
    
        let activeColorElem = null;
    
        colors.forEach((color, index) => {
            const colorElem = document.createElement('div');
            colorElem.className = 'w-6 h-6 rounded border-2 border-gray-300 cursor-pointer';
            colorElem.style.backgroundColor = color.hex;
            colorContainer.appendChild(colorElem);
        });
    
        // Обработчик клика — всегда ставим одну и ту же картинку
        colorContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('cursor-pointer')) {
                if (activeColorElem) {
                    activeColorElem.classList.replace('border-blue-500', 'border-gray-300');
                }
                e.target.classList.replace('border-gray-300', 'border-blue-500');
                activeColorElem = e.target;
                carImage.src = `../assets/auto/Rectangle 243.png`;
            }
        });
    
        if (colorContainer.firstElementChild) {
            colorContainer.firstElementChild.click();
        }
    }

    function formatCurrency(val) {
        return new Intl.NumberFormat('ru-RU').format(Math.round(val)) + ' ₽';
    }

    function getTermLabel(years) {
        if (years === 0.5) return '6 мес.';
        const n = Math.floor(years);
        const remainder = years - n;
        if (remainder === 0) {
            if (n % 10 === 1 && n % 100 !== 11) return n + ' год';
            if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return n + ' года';
            return n + ' лет';
        } else {
            const months = Math.round(remainder * 12);
            if (n === 0) return `${months} мес.`;
            let yearPart = '';
            if (n % 10 === 1 && n % 100 !== 11) yearPart = n + ' год';
            else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) yearPart = n + ' года';
            else yearPart = n + ' лет';
            return `${yearPart} ${months} мес.`;
        }
    }

    function calcPayment(principal, rate, months) {
        if (months <= 0 || principal <= 0) return 0;
        const r = rate / 100 / 12;
        return principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    }

    // === ОБНОВЛЕНИЕ ВСЕГО ===
    function updateAll() {
        const hasSelection = selectedModel && carPrice > 0;

        conditionalForm.classList.toggle('hidden', !hasSelection);
        conditionalOffer.classList.toggle('hidden', !hasSelection);

        if (hasSelection) {
            const parent = carImageDisplay.parentElement;
            if (carImageDisplay.parentNode) {
                parent.replaceChild(carImage, carImageDisplay);
            }
            initColorPicker();

            carModelTitle.textContent = selectedModel === 'T77' ? 'FAW T77' : 'FAW T90';
            carSpecs.textContent = trimSelect.options[trimSelect.selectedIndex]?.textContent.split(' — ')[0] || '—';
            originalPriceEl.textContent = formatCurrency(carPrice * 1.2);
            finalPriceEl.textContent = formatCurrency(carPrice);
        } else {
            const parent = carImage.parentElement;
            if (carImage.parentNode) {
                parent.replaceChild(carImageDisplay, carImage);
            }
            carImageDisplay.src = "../assets/auto/Rectangle 244.png";
            carImageDisplay.alt = "Выберите автомобиль";

            carPriceDisplay.textContent = "—";
            // Сброс значений ползунков при отсутствии выбора
            downSlider.value = "0";
            termSlider.value = "0.5";
            updateTracks(); // обновляем треки даже при сбросе
            return;
        }

        // Расчёт
        const downPerc = parseFloat(downSlider.value);
        const termYears = parseFloat(termSlider.value);

        const downAmt = (carPrice * downPerc) / 100;
        const credit = carPrice - downAmt;
        const months = termYears * 12;
        const payment = calcPayment(credit, interestRate, months);

        // Обновление текста
        carPriceDisplay.textContent = formatCurrency(carPrice);
        examplePaymentEl.textContent = formatCurrency(Math.round(payment));

        downAmountEl.textContent = formatCurrency(downAmt);
        downPercentEl.textContent = `(${Math.round(downPerc)}%)`;
        downDisplayEl.textContent = `${formatCurrency(downAmt)} (${Math.round(downPerc)}%)`;

        termYearsEl.textContent = getTermLabel(termYears);
        termDisplayEl.textContent = getTermLabel(termYears);

        creditAmountEl.textContent = formatCurrency(credit);
        monthlyPaymentEl.textContent = `${formatCurrency(Math.round(payment))}/мес.`;

        // Обязательно обновляем треки
        updateTracks();
    }

    // === Отдельная функция для обновления треков ===
    function updateTracks() {
        const downPerc = parseFloat(downSlider.value);
        const termYears = parseFloat(termSlider.value);

        // Ширина трека для первоначального взноса: 0% → 0%, 90% → 100%
        const downWidth = Math.max(0, Math.min(100, (downPerc / 90) * 100));
        downTrack.style.width = `${downWidth}%`;

        // Ширина трека для срока: 0.5 → 0%, 7 → 100%
        const termWidth = Math.max(0, Math.min(100, ((termYears - 0.5) / (7 - 0.5)) * 100));
        termTrack.style.width = `${termWidth}%`;
    }

    // === ЛОГИКА ВЫБОРА АВТО ===
    function populateTrims() {
        const model = modelSelect.value;
        if (!model || !carData[model]) {
            selectedModel = null;
            carPrice = 0;
            trimSelect.innerHTML = '<option value="" disabled selected>Сначала выберите модель</option>';
            trimSelect.disabled = true;
            updateAll();
            return;
        }

        trimSelect.disabled = false;
        selectedModel = model;
        trimSelect.innerHTML = '<option value="" disabled selected>Выберите комплектацию</option>';
        for (const [trim, price] of Object.entries(carData[model])) {
            const option = document.createElement('option');
            option.value = price;
            option.textContent = `${trim} — ${formatCurrency(price)}`;
            trimSelect.appendChild(option);
        }
        trimSelect.value = '';
        carPrice = 0;
        updateAll();
    }

    // === СОБЫТИЯ ===
    modelSelect.addEventListener('change', populateTrims);
    trimSelect.addEventListener('change', () => {
        carPrice = trimSelect.value ? parseInt(trimSelect.value) : 0;
        updateAll();
    });

    // Теперь ползунки работают через updateAll + updateTracks
    downSlider.addEventListener('input', updateAll);
    termSlider.addEventListener('input', updateAll);

    termButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            termSlider.value = btn.dataset.term;
            updateAll();
        });
    });

    // Инициализация
    updateAll();
});