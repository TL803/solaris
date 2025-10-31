// core/popupManager.js

import { ModalBackdrop } from '../templates/base/modalBackdrop.js';
import { PopupFactory } from './popupFactory.js';
import { Dom } from '../../../utils/Dom.js';

export class PopupManager {
  constructor() {
    this.currentModal = null;
    this.cleanupEscape = null;
    this.init();
  }

  init() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open-modal]');
      if (trigger) {
        e.preventDefault();
        const modalName = trigger.getAttribute('data-open-modal');
        const params = this.parseModalParams(trigger);
        this.open(modalName, params);
      }
    });

    // Автоматический попап полностью удалён
  }

  parseModalParams(trigger) {
    const params = {};
    for (const attr of trigger.attributes) {
      if (attr.name.startsWith('data-')) {
        const key = attr.name.replace('data-', '');
        params[key] = attr.value;
      }
    }
    return params;
  }

  open(name, params = {}) {
    this.close();

    const modalContent = PopupFactory.createModal(name, params);
    const backdrop = new ModalBackdrop();

    const modalElement = document.createElement('div');
    modalElement.className = 'modal-window relative';
    modalElement.innerHTML = modalContent.template;

    // Крестик управляется извне (внешний UI)
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'modal-close-btn absolute top-8 right-4 z-50 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200 hover:border-gray-300';
    closeBtn.setAttribute('aria-label', 'Закрыть');
    closeBtn.innerHTML = `
      <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    `;

    modalElement.prepend(closeBtn);
    backdrop.element.appendChild(modalElement);
    document.body.appendChild(backdrop.element);

    if (typeof modalContent.onInit === 'function') {
      modalContent.onInit(modalElement, () => this.close(), params);
    }

    this.currentModal = {
      backdrop,
      element: modalElement,
      closeBtn
    };

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.close();
    });

    backdrop.element.addEventListener('click', (e) => {
      if (e.target === backdrop.element) {
        this.close();
      }
    });

    this.cleanupEscape = Dom.onEscape?.(() => this.close()) || null;
  }

  close() {
    if (this.currentModal) {
      if (this.currentModal.element.parentNode) {
        this.currentModal.element.parentNode.removeChild(this.currentModal.element);
      }
      this.currentModal.backdrop.hide();
      this.currentModal = null;
    }

    if (this.cleanupEscape) {
      this.cleanupEscape();
      this.cleanupEscape = null;
    }
  }

  destroy() {
    this.close();
  }
}