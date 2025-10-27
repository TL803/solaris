document.querySelectorAll('input[data-validate="phone"]').forEach(input => {
    const mask = IMask(input, {
        mask: '+{7} (000) 000-00-00',
        lazy: false
    });

    input.addEventListener('paste', function (e) {
        e.preventDefault();

        const pastedText = (e.clipboardData || window.clipboardData).getData('text') || '';
        let digits = pastedText.replace(/\D/g, '');

        if (digits.length > 0 && (digits[0] === '7' || digits[0] === '8')) {
            digits = digits.substring(1);
        }

        digits = digits.substring(0, 10);

        mask.unmaskedValue = digits;

        toggleError(input, false);
    });
});

document.querySelectorAll('[data-car-form]').forEach(form => {
    form.addEventListener('submit', function (e) {
        let isValid = true;

        this.querySelectorAll('input[data-validate="name"]').forEach(input => {
            const value = input.value.trim();
            const valid = /^[а-яА-ЯёЁa-zA-Z\s]{2,}$/.test(value);
            toggleError(input, !valid);
            if (!valid) isValid = false;
        });

        this.querySelectorAll('input[data-validate="phone"]').forEach(input => {
            const unmasked = input.value.replace(/\D/g, '');
            const valid = unmasked.length === 11 && unmasked.startsWith('7');
            toggleError(input, !valid);
            if (!valid) isValid = false;
        });

        this.querySelectorAll('input[data-validate="required"][type="checkbox"]').forEach(input => {
            const valid = input.checked;
            toggleError(input, !valid);
            if (!valid) isValid = false;
        });

        if (!isValid) {
            e.preventDefault();
            console.warn('Форма содержит ошибки');
        }
    });
});

function toggleError(input, hasError) {
    const wrapper = input.type === 'checkbox'
        ? input.closest('label')?.parentElement || input.parentElement
        : input.closest('div') || input.parentElement;

    let errorEl = wrapper.querySelector('.validation-error');

    if (hasError) {
        if (!errorEl) {
            errorEl = document.createElement('p');
            errorEl.className = 'validation-error text-red-400 text-sm mt-1';
            if (input.dataset.validate === 'name') {
                errorEl.textContent = 'Имя должно содержать минимум 2 буквы и не включать цифры';
            } else if (input.dataset.validate === 'phone') {
                errorEl.textContent = 'Пожалуйста, введите корректный номер телефона';
            } else if (input.dataset.validate === 'required' && input.type === 'checkbox') {
                errorEl.textContent = 'Необходимо согласие на обработку персональных данных';
            }
            wrapper.appendChild(errorEl);
        }
        if (input.type === 'checkbox') {
            const label = input.closest('label');
            if (label) label.classList.add('border-red-500');
        } else {
            input.classList.add('border-red-500');
        }
    } else {
        if (errorEl) errorEl.remove();
        if (input.type === 'checkbox') {
            const label = input.closest('label');
            if (label) label.classList.remove('border-red-500');
        } else {
            input.classList.remove('border-red-500');
        }
    }
}

document.querySelectorAll('input[data-validate]').forEach(input => {
    if (input.type === 'checkbox') {
        input.addEventListener('change', () => toggleError(input, false));
    } else {
        input.addEventListener('focus', () => toggleError(input, false));
    }
});