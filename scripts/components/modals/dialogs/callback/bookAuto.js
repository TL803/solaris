import { FormValidator } from '../../utils/validation.js';

export const BookingModal = {
  template: () => `
    <div 
      style="background-image: url('../assets/popup/1247d8f285138a450077ef4ce1500f74be1add6f (1).png'); background-size: cover; background-position: center;"
      class="popup__content popup__content--booking bg-cover bg-center rounded-xl shadow-lg w-full max-w-[646px] md:max-w-[768px] mx-auto px-6 md:px-10 py-6 md:py-8 relative"
    >
      <!-- Затемняющий слой -->
      <div class="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>

      <div class="relative z-10">
        <h2 class="text-center text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-white">Забронировать автомобиль</h2>
        <p class="text-center text-sm md:text-base text-white mb-6 opacity-90 leading-tight">
          Введите ваши данные, чтобы закрепить за собой выбранное авто.<br>
          Наш менеджер свяжется с вами в ближайшее время<br>
          для подтверждения брони.
        </p>

        <form class="booking-form" novalidate>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1 text-white">ФИО</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Иванов Иван Иванович" 
              class="w-full px-4 py-3 border border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1 text-white">Телефон</label>
            <input 
              type="tel" 
              name="telephone" 
              placeholder="8 XXX XXX XX XX" 
              class="w-full px-4 py-3 border border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
          </div>
          <div class="mb-6 flex items-start">
            <div class="flex items-start space-x-2">
              <div class="relative">
                <input 
                  type="checkbox" 
                  name="privacy-consent" 
                  id="consent" 
                  class="sr-only" 
                  required
                >
                <div class="checkbox-box w-6 h-6 bg-white border border-gray-300 rounded cursor-pointer flex items-center justify-center">
                  <svg class="hidden w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <label for="consent" class="text-xs md:text-sm text-white opacity-90 leading-tight">
                Согласен с политикой обработки персональных данных
              </label>
            </div>
          </div>
          <button 
            type="submit" 
            class="w-full bg-blue-600 text-white py-3.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-base"
          >
            Забронировать
          </button>
        </form>
      </div>
    </div>
  `,

  onInit: (modalElement, closeCallback, params) => {
    const form = modalElement.querySelector('.booking-form');
    if (!form) return;

    const checkboxInput = form.querySelector('#consent');
    const checkboxBox = form.querySelector('.checkbox-box');
    const checkboxSvg = form.querySelector('.checkbox-box svg');

    // Обновление стилей чекбокса при клике
    checkboxBox.addEventListener('click', () => {
      checkboxInput.checked = !checkboxInput.checked;
      if (checkboxInput.checked) {
        checkboxSvg.classList.remove('hidden');
        checkboxBox.classList.replace('bg-white', 'bg-blue-600');
        checkboxBox.classList.replace('border-gray-300', 'border-blue-600');
        checkboxSvg.classList.replace('text-black', 'text-white');
      } else {
        checkboxSvg.classList.add('hidden');
        checkboxBox.classList.replace('bg-blue-600', 'bg-white');
        checkboxBox.classList.replace('border-blue-600', 'border-gray-300');
        checkboxSvg.classList.replace('text-white', 'text-black');
      }
    });

    // Обновление стилей при изменении состояния через JS
    checkboxInput.addEventListener('change', () => {
      if (checkboxInput.checked) {
        checkboxSvg.classList.remove('hidden');
        checkboxBox.classList.replace('bg-white', 'bg-blue-600');
        checkboxBox.classList.replace('border-gray-300', 'border-blue-600');
        checkboxSvg.classList.replace('text-black', 'text-white');
      } else {
        checkboxSvg.classList.add('hidden');
        checkboxBox.classList.replace('bg-blue-600', 'bg-white');
        checkboxBox.classList.replace('border-blue-600', 'border-gray-300');
        checkboxSvg.classList.replace('text-white', 'text-black');
      }
    });

    // Успешная отправка формы
    const handleSuccess = () => {
      const container = form.closest('.popup__content');
      if (container) {
        container.innerHTML = `
          <div class="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>
          <div class="relative z-10 text-center py-8 md:py-10">
            <h3 class="text-white text-2xl md:text-3xl font-bold mb-6">
              Ваша заявка успешно отправлена!
            </h3>
            <button type="button" class="w-full bg-blue-600 text-white py-3.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-base">
              отлично
            </button>
          </div>
        `;

        const okButton = container.querySelector('button');
        if (okButton) {
          okButton.addEventListener('click', () => {
            closeCallback();
          });
        }
      }
    };

    new FormValidator(form, handleSuccess);
  }
};