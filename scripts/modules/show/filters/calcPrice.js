  // === 1. Зависимость выпадающих списков: модель → комплектация ===
  document.addEventListener('DOMContentLoaded', () => {
    const modelSelect = document.getElementById('carModelSelect');
    const trimSelect = document.getElementById('carTrimSelect');

    if (modelSelect && trimSelect) {
      modelSelect.addEventListener('change', () => {
        if (modelSelect.value) {
          trimSelect.disabled = false;
        } else {
          trimSelect.disabled = true;
          trimSelect.value = '';
        }
      });
    }
  });

  // === 2. Двухползунковый слайдер цены (только если элементы существуют) ===
  (function () {
    // Проверяем наличие ВСЕХ необходимых элементов
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const priceSlider = document.getElementById('priceSlider');
    const sliderRange = document.getElementById('sliderRange');
    const minThumb = document.getElementById('minThumb');
    const maxThumb = document.getElementById('maxThumb');

    // Если хотя бы одного нет — не инициализируем слайдер
    if (!minPriceInput || !maxPriceInput || !priceSlider || !sliderRange || !minThumb || !maxThumb) {
      return;
    }

    // Константы
    const MIN_PRICE = 0;
    const MAX_PRICE = 3000000;
    let minPriceValue = 1000000;
    let maxPriceValue = 2000000;
    let isDragging = false;
    let activeThumb = null;

    // Инициализация
    function initPriceSlider() {
      updateSliderPosition();
      setupEventListeners();
    }

    function formatPriceInput(input) {
      let value = input.value.replace(/\D/g, '');
      value = Math.min(parseInt(value) || MIN_PRICE, MAX_PRICE);

      if (input.id === 'minPrice') {
        value = Math.min(value, maxPriceValue - 100000);
        minPriceValue = value;
      } else {
        value = Math.max(value, minPriceValue + 100000);
        maxPriceValue = value;
      }

      input.value = value.toLocaleString('ru-RU').replace(/,/g, ' ');
      updateSliderPosition();
    }

    function updateSliderPosition() {
      const sliderWidth = priceSlider.offsetWidth;
      const minPosition = ((minPriceValue - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * sliderWidth;
      const maxPosition = ((maxPriceValue - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * sliderWidth;

      sliderRange.style.left = minPosition + 'px';
      sliderRange.style.right = sliderWidth - maxPosition + 'px';
      minThumb.style.left = minPosition - 8 + 'px';
      maxThumb.style.left = maxPosition - 8 + 'px';

      minPriceInput.value = minPriceValue.toLocaleString('ru-RU').replace(/,/g, ' ');
      maxPriceInput.value = maxPriceValue.toLocaleString('ru-RU').replace(/,/g, ' ');
    }

    function getValueFromPosition(position) {
      const sliderWidth = priceSlider.offsetWidth;
      const percentage = position / sliderWidth;
      let value = Math.round(percentage * (MAX_PRICE - MIN_PRICE) + MIN_PRICE);
      value = Math.round(value / 50000) * 50000;
      return Math.max(MIN_PRICE, Math.min(MAX_PRICE, value));
    }

    function setupEventListeners() {
      [minThumb, maxThumb].forEach((thumb) => {
        thumb.addEventListener('mousedown', startDrag);
        thumb.addEventListener('touchstart', startDrag);
      });

      priceSlider.addEventListener('mousedown', handleSliderClick);
      priceSlider.addEventListener('touchstart', handleSliderClick);

      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('touchmove', handleDrag);
      document.addEventListener('mouseup', stopDrag);
      document.addEventListener('touchend', stopDrag);

      minPriceInput.addEventListener('input', () => formatPriceInput(minPriceInput));
      maxPriceInput.addEventListener('input', () => formatPriceInput(maxPriceInput));
    }

    function startDrag(e) {
      e.preventDefault();
      isDragging = true;
      activeThumb = e.target;
      activeThumb.style.zIndex = '10';
    }

    function handleSliderClick(e) {
      if (isDragging) return;
      const rect = priceSlider.getBoundingClientRect();
      const position = e.clientX - rect.left;
      const value = getValueFromPosition(position);

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

    function handleDrag(e) {
      if (!isDragging || !activeThumb) return;
      e.preventDefault();
      const rect = priceSlider.getBoundingClientRect();
      let position = e.type === 'mousemove' ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
      position = Math.max(0, Math.min(rect.width, position));
      const value = getValueFromPosition(position);

      if (activeThumb === minThumb) {
        minPriceValue = Math.min(value, maxPriceValue - 100000);
      } else {
        maxPriceValue = Math.max(value, minPriceValue + 100000);
      }

      updateSliderPosition();
    }

    function stopDrag() {
      isDragging = false;
      if (activeThumb) {
        activeThumb.style.zIndex = '';
        activeThumb = null;
      }
    }

    // Инициализируем ТОЛЬКО если все элементы на месте
    document.addEventListener('DOMContentLoaded', initPriceSlider);
  })();