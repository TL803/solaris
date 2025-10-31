import { Dom } from '../../../../utils/Dom.js';

export class ModalBackdrop {
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
    this.element.setAttribute('role', 'dialog');
    this.element.setAttribute('aria-modal', 'true');
  }

  show() {
    document.body.appendChild(this.element);
    Dom.disableScroll?.();
  }

  hide() {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    Dom.enableScroll?.();
  }
}