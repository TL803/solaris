import { FormValidator } from '../../utils/validation.js';

export const TradeInOfferModal = {
  template: () => `
    <div class="popup__content popup__content--tradein bg-white rounded-xl shadow-lg w-full max-w-[646px] md:max-w-[768px] mx-auto px-6 md:px-10 py-6 md:py-8 relative">

      <div class="relative z-10 text-gray-900">
        <h2 class="popup__title text-center text-2xl md:text-3xl font-bold mb-2">
          Получить специальное предложение на Трейд-ин до 210 000 ₽
        </h2>
        <p class="popup__subtitle text-center text-sm md:text-base opacity-90 mb-6">
          Обновите свой автомобиль по программе трейд-ин с дополнительной выгодой от Solaris – Независимость.
        </p>

        <form class="tradein-form" novalidate>
          <div class="mb-4">
            <label class="block text-sm md:text-base font-medium mb-1">ФИО</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Иванов Иван Иванович" 
              class="w-full px-4 py-3 md:py-4 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm md:text-base font-medium mb-1">Телефон</label>
            <input 
              type="tel" 
              name="telephone" 
              placeholder="8 XXX XXX XX XX" 
              class="w-full px-4 py-3 md:py-4 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            >
          </div>
          <div class="mb-6 flex items-start">
            <!-- Кастомный чекбокс — как на картинке -->
            <div class="flex items-start space-x-2">
              <div class="relative">
                <input 
                  type="checkbox" 
                  name="privacy-consent" 
                  id="consent" 
                  class="sr-only" 
                  required
                  checked
                >
                <div class="checkbox-box w-6 h-6 bg-white border border-gray-300 rounded cursor-pointer flex items-center justify-center">
                  <svg class="hidden w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <label for="consent" class="text-[15px] md:text-base leading-tight">
                Согласен с <a href="#" class="underline hover:text-blue-600">политикой обработки персональных данных</a>
              </label>
            </div>
          </div>
          <button 
            type="submit" 
            class="w-full bg-blue-600 text-white py-3.5 md:py-4 rounded-xl hover:bg-blue-700 transition-colors font-medium text-base md:text-lg"
          >
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  `,

  onInit: (modalElement, closeCallback, params) => {
    const form = modalElement.querySelector('.tradein-form');
    if (!form) return;

    const checkboxInput = form.querySelector('#consent');
    const checkboxBox = form.querySelector('.checkbox-box');
    const checkboxSvg = form.querySelector('.checkbox-box svg');

    // Обработка клика по кастомному чекбоксу
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

    // Обработка изменения состояния через JS
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
          <div class="absolute inset-0 bg-black bg-opacity-40 rounded-xl"></div>
          <div class="relative z-10 text-center py-8 md:py-10 text-gray-900">
            <h3 class="text-2xl md:text-3xl font-bold mb-6">
              Ваша заявка успешно отправлена!
            </h3>
            <button type="button" class="w-full bg-blue-600 text-white py-3.5 md:py-4 rounded-xl hover:bg-blue-700 transition-colors font-medium text-base md:text-lg">
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