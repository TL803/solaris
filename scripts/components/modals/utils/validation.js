export class FormValidator {
  constructor(formElement, onSuccess) {
    this.form = formElement;
    this.onSuccess = onSuccess;
    this.phoneInput = formElement.querySelector('input[name="telephone"]');
    this.fullnameInput = formElement.querySelector('input[name="name"]');
    this.consentCheckbox = formElement.querySelector('input[name="privacy-consent"]');

    this.init();
  }

  init() {
    this.initPhoneMask();
    this.bindEvents();
  }

  initPhoneMask() {
    if (!this.phoneInput) return;
    this.mask = IMask(this.phoneInput, {
      mask: '+{7} (000) 000-00-00',
      lazy: false,
    });
  }

  bindEvents() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    if (this.fullnameInput) {
      this.fullnameInput.addEventListener('input', (e) => {
        this.filterNameInput(e);
        this.clearError(this.fullnameInput);
      });
    }

    this.phoneInput?.addEventListener('input', () => this.clearError(this.phoneInput));
    this.consentCheckbox?.addEventListener('change', () => {
      if (this.consentCheckbox.checked) this.clearError(this.consentCheckbox);
    });
  }

  // Оставляем только буквы, пробелы и дефисы (можно адаптировать под нужды)
  filterNameInput(event) {
    let value = event.target.value;
    // Разрешаем буквы (кириллица и латиница), пробелы и дефисы
    const filtered = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s\-]/g, '');
    if (value !== filtered) {
      event.target.value = filtered;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.validate()) {
      this.onSuccess();
    }
  }

  validate() {
    let isValid = true;

    const nameValue = this.fullnameInput?.value.trim() || '';
    if (!nameValue) {
      this.showError(this.fullnameInput, 'Пожалуйста, укажите ваше ФИО');
      isValid = false;
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(nameValue)) {
      this.showError(this.fullnameInput, 'ФИО должно содержать только буквы, пробелы или дефисы');
      isValid = false;
    } else {
      this.clearError(this.fullnameInput);
    }

    const unmasked = this.mask?.unmaskedValue || '';
    if (unmasked.length < 10) {
      this.showError(this.phoneInput, 'Пожалуйста, введите корректный номер телефона');
      isValid = false;
    } else {
      this.clearError(this.phoneInput);
    }

    if (!this.consentCheckbox?.checked) {
      this.showError(this.consentCheckbox, 'Требуется согласие на обработку персональных данных');
      isValid = false;
    } else {
      this.clearError(this.consentCheckbox);
    }

    return isValid;
  }

  showError(el, message) {
    if (el.type === 'checkbox') {
      const wrapper = el.closest('div');
      let errorEl = wrapper.querySelector('.error-message');
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'error-message text-red-500 text-xs mt-1';
        wrapper.appendChild(errorEl);
      }
      errorEl.textContent = message;
    } else {
      el.classList.add('border-red-500');
      let errorEl = el.parentNode.querySelector('.error-message');
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'error-message text-red-500 text-xs mt-1';
        el.parentNode.appendChild(errorEl);
      }
      errorEl.textContent = message;
    }
  }

  clearError(el) {
    if (el.type === 'checkbox') {
      const errorEl = el.closest('div').querySelector('.error-message');
      if (errorEl) errorEl.remove();
    } else {
      el.classList.remove('border-red-500');
      const errorEl = el.parentNode.querySelector('.error-message');
      if (errorEl) errorEl.remove();
    }
  }
}