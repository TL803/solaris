document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('[data-car-form]');

    // === ДИНАМИЧЕСКОЕ СОЗДАНИЕ МОДАЛКИ ===
    let modal = document.getElementById('success-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'success-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden p-4';
        modal.innerHTML = `
            <div class="bg-[#F0F0F0] rounded-xl w-full max-w-3xl text-center shadow-xl flex flex-col justify-center items-center p-6 md:p-10">
                <h2 class="text-2xl md:text-3xl lg:text-4xl font-light text-gray-800 mb-3 md:mb-4">
                    Ваша заявка успешно отправлена!
                </h2>
                <p class="text-base md:text-lg font-light text-gray-600 mb-6 md:mb-8 px-2">
                    Мы уже готовим для вас персональное предложение.<br>
                    Совсем скоро наш менеджер свяжется с вами, чтобы обсудить детали и помочь приблизить момент, когда ключи от нового автомобиля Solaris окажутся в ваших руках.
                </p>
                <button id="close-modal" class="w-full max-w-xs py-3 px-6 text-base font-normal bg-gradient-to-r from-blue-900 to-blue-500 text-white rounded-lg hover:from-blue-800 hover:to-blue-400 transition">
                    Отлично
                </button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Маска для телефона
    const phoneInput = document.querySelector('input[data-validate="phone"]');
    let mask = null;
    if (phoneInput) {
        mask = IMask(phoneInput, {
            mask: '+{7} (000) 000-00-00'
        });
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameInput = document.querySelector('input[data-validate="name"]');
            const phoneInput = document.querySelector('input[data-validate="phone"]');
            const checkbox = document.querySelector('input[data-validate="required"]');

            let isValid = true;

            // Валидация имени
            if (!nameInput.value.trim()) {
                isValid = false;
                nameInput.classList.add('border-red-500');
            } else {
                nameInput.classList.remove('border-red-500');
            }

            // Валидация телефона
            const phoneValue = phoneInput.value.replace(/\D/g, '');
            if (phoneValue.length !== 11 || !phoneValue.startsWith('7')) {
                isValid = false;
                phoneInput.classList.add('border-red-500');
            } else {
                phoneInput.classList.remove('border-red-500');
            }

            // Валидация чекбокса
            if (!checkbox.checked) {
                isValid = false;
                checkbox.parentElement.classList.add('border-red-500');
            } else {
                checkbox.parentElement.classList.remove('border-red-500');
            }

            if (isValid) {
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';

                form.reset();
                if (phoneInput && mask) {
                    mask.unmaskedValue = '';
                }

                nameInput.classList.remove('border-red-500');
                phoneInput.classList.remove('border-red-500');
                checkbox.parentElement.classList.remove('border-red-500');
            }
        });
    }

    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'close-modal') {
            closeModal();
        }
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});