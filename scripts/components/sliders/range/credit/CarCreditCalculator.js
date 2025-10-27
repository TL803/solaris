document.addEventListener('DOMContentLoaded', function() {
    // Данные: модели → комплектации → цена
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
    const interestRate = 12; // % годовых

    // DOM
    const modelSelect = document.querySelector('[data-select-model]');
    const trimSelect = document.querySelector('[data-select-trim]');
    const carPriceDisplay = document.getElementById('carPriceDisplay');

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
    const carImageDisplay = document.getElementById('carImageDisplay');

    const termButtons = document.querySelectorAll('[data-term]');

    // Форматирование
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

    // Расчёт платежа
    function calcPayment(principal, rate, months) {
        if (months <= 0 || principal <= 0) return 0;
        const r = rate / 100 / 12;
        return principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    }

    // Обновление всего
    function updateAll() {
        const hasSelection = selectedModel && carPrice > 0;

        // Обновляем изображение
        if (hasSelection) {
            carImageDisplay.src = "../assets/auto/Rectangle 243.png";
            carImageDisplay.alt = selectedModel;
        } else {
            carImageDisplay.src = "../assets/auto/Rectangle 244.png";
            carImageDisplay.alt = "Выберите автомобиль";
        }

        // Если нет выбора — сбрасываем данные на заглушки
        if (!hasSelection) {
            carPriceDisplay.textContent = "—";
            creditAmountEl.textContent = "—";
            loanTermDisplay.textContent = "—";
            downPaymentDisplay.textContent = "—";
            monthlyPaymentEl.textContent = "—";
            termYearsEl.textContent = "6 мес.";
            downAmountEl.textContent = "0 ₽";
            downPercentEl.textContent = "(0%)";

            // Треки
            downTrack.style.width = "0%";
            termTrack.style.width = "0%";

            return;
        }

        // Расчёт при наличии данных
        const downPerc = parseFloat(downSlider.value);
        const termYears = parseFloat(termSlider.value);

        const downAmt = (carPrice * downPerc) / 100;
        const credit = carPrice - downAmt;
        const months = termYears * 12;
        const payment = calcPayment(credit, interestRate, months);

        // Обновляем текст
        carPriceDisplay.textContent = formatCurrency(carPrice);
        downAmountEl.textContent = formatCurrency(downAmt);
        downPercentEl.textContent = `(${Math.round(downPerc)}%)`;
        downDisplayEl.textContent = `${formatCurrency(downAmt)} (${Math.round(downPerc)}%)`;

        termYearsEl.textContent = getTermLabel(termYears);
        termDisplayEl.textContent = getTermLabel(termYears);

        creditAmountEl.textContent = formatCurrency(credit);
        monthlyPaymentEl.textContent = `${formatCurrency(Math.round(payment))}/мес.`;

        // Треки
        const downWidth = (downPerc / 90) * 100;
        downTrack.style.width = `${Math.max(0, downWidth)}%`;

        const termWidth = ((termYears - 0.5) / (7 - 0.5)) * 100;
        termTrack.style.width = `${Math.max(0, termWidth)}%`;
    }

    // Заполнить комплектации по модели
    function populateTrims() {
        const model = modelSelect.value;
        
        if (!model || !carData[model]) {
            // Если модель не выбрана или не найдена
            selectedModel = null;
            carPrice = 0;
            trimSelect.innerHTML = '<option value="" disabled selected>Сначала выберите модель</option>';
            trimSelect.disabled = true;
            updateAll();
            return;
        }

        // Активируем select комплектаций
        trimSelect.disabled = false;
        selectedModel = model;
        const trims = carData[model];
        
        // Очищаем и заполняем select комплектаций
        trimSelect.innerHTML = '<option value="" disabled selected>Выберите комплектацию</option>';
        
        for (const [trim, price] of Object.entries(trims)) {
            const option = document.createElement('option');
            option.value = price;
            option.textContent = `${trim} — ${formatCurrency(price)}`;
            trimSelect.appendChild(option);
        }

        trimSelect.value = '';
        carPrice = 0;
        updateAll();
    }

    // Обработчики
    modelSelect.addEventListener('change', populateTrims);

    trimSelect.addEventListener('change', () => {
        if (trimSelect.value) {
            carPrice = parseInt(trimSelect.value);
        } else {
            carPrice = 0;
        }
        updateAll();
    });

    downSlider.addEventListener('input', updateAll);
    termSlider.addEventListener('input', updateAll);

    termButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const t = parseFloat(btn.dataset.term);
            termSlider.value = t;
            updateAll();
        });
    });

    // Инициализация
    updateAll();
});