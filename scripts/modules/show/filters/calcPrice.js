// Константы
const MIN_PRICE = 0;
const MAX_PRICE = 3000000;
let minPriceValue = 1000000;
let maxPriceValue = 2000000;
let isDragging = false;
let activeThumb = null;

// Элементы DOM
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const priceSlider = document.getElementById('priceSlider');
const sliderRange = document.getElementById('sliderRange');
const minThumb = document.getElementById('minThumb');
const maxThumb = document.getElementById('maxThumb');

// Инициализация
function initPriceSlider() {
    updateSliderPosition();
    setupEventListeners();
}

// Форматирование ввода цены
function formatPriceInput(input) {
    // Удаляем все нецифровые символы
    let value = input.value.replace(/\D/g, '');
    
    // Ограничиваем максимальное значение
    value = Math.min(parseInt(value) || MIN_PRICE, MAX_PRICE);
    
    // Обновляем значение в зависимости от того, какой это инпут
    if (input.id === 'minPrice') {
        value = Math.min(value, maxPriceValue - 100000); // Минимальная разница 100,000
        minPriceValue = value;
    } else {
        value = Math.max(value, minPriceValue + 100000); // Минимальная разница 100,000
        maxPriceValue = value;
    }
    
    // Форматируем с пробелами
    input.value = value.toLocaleString('ru-RU').replace(/,/g, ' ');
    
    updateSliderPosition();
}

// Обновление позиции слайдера
function updateSliderPosition() {
    const sliderWidth = priceSlider.offsetWidth;
    const minPosition = ((minPriceValue - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * sliderWidth;
    const maxPosition = ((maxPriceValue - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * sliderWidth;
    
    // Позиция для range (синей области)
    sliderRange.style.left = minPosition + 'px';
    sliderRange.style.right = (sliderWidth - maxPosition) + 'px';
    
    // Позиции для ползунков
    minThumb.style.left = (minPosition - 8) + 'px'; // 8px = половина ширины ползунка
    maxThumb.style.left = (maxPosition - 8) + 'px';
    
    // Обновляем значения в инпутах
    minPriceInput.value = minPriceValue.toLocaleString('ru-RU').replace(/,/g, ' ');
    maxPriceInput.value = maxPriceValue.toLocaleString('ru-RU').replace(/,/g, ' ');
}

// Получение значения из позиции слайдера
function getValueFromPosition(position) {
    const sliderWidth = priceSlider.offsetWidth;
    const percentage = position / sliderWidth;
    let value = Math.round(percentage * (MAX_PRICE - MIN_PRICE) + MIN_PRICE);
    
    // Округляем до ближайших 50,000 для плавности
    value = Math.round(value / 50000) * 50000;
    
    return Math.max(MIN_PRICE, Math.min(MAX_PRICE, value));
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Обработчики для ползунков
    [minThumb, maxThumb].forEach(thumb => {
        thumb.addEventListener('mousedown', startDrag);
        thumb.addEventListener('touchstart', startDrag);
    });
    
    // Обработчики для клика по слайдеру
    priceSlider.addEventListener('mousedown', handleSliderClick);
    priceSlider.addEventListener('touchstart', handleSliderClick);
    
    // Глобальные обработчики для drag
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
}

// Начало перетаскивания
function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    activeThumb = e.target;
    activeThumb.style.zIndex = '10';
}

// Обработка клика по слайдеру
function handleSliderClick(e) {
    if (isDragging) return;
    
    const rect = priceSlider.getBoundingClientRect();
    const position = e.clientX - rect.left;
    const value = getValueFromPosition(position);
    
    // Определяем, к какому ползунку ближе клик
    const minDistance = Math.abs(value - minPriceValue);
    const maxDistance = Math.abs(value - maxPriceValue);
    
    if (minDistance <= maxDistance) {
        minPriceValue = Math.min(value, maxPriceValue - 100000);
        activeThumb = minThumb;
    } else {
        maxPriceValue = Math.max(value, minPriceValue + 100000);
        activeThumb = maxThumb;
    }
    
    updateSliderPosition();
}

// Обработка перетаскивания
function handleDrag(e) {
    if (!isDragging || !activeThumb) return;
    
    e.preventDefault();
    const rect = priceSlider.getBoundingClientRect();
    let position;
    
    if (e.type === 'mousemove') {
        position = e.clientX - rect.left;
    } else if (e.type === 'touchmove') {
        position = e.touches[0].clientX - rect.left;
    }
    
    position = Math.max(0, Math.min(rect.width, position));
    const value = getValueFromPosition(position);
    
    if (activeThumb === minThumb) {
        minPriceValue = Math.min(value, maxPriceValue - 100000);
    } else {
        maxPriceValue = Math.max(value, minPriceValue + 100000);
    }
    
    updateSliderPosition();
}

// Окончание перетаскивания
function stopDrag() {
    isDragging = false;
    if (activeThumb) {
        activeThumb.style.zIndex = '';
        activeThumb = null;
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initPriceSlider);