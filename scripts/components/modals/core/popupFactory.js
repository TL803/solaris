// core/popupFactory.js

import { CallbackModal } from '../dialogs/callback/feedback.js';
import { BookingModal } from '../dialogs/callback/bookAuto.js';

export class PopupFactory {
    static createModal(modalType, options = {}) {
        const modalConfig = this.getModalConfig(modalType);

        if (!modalConfig) {
            throw new Error(`Не найдена конфигурация для модалки: ${modalType}`);
        }

        const template = typeof modalConfig.template === 'function'
            ? modalConfig.template(options)
            : modalConfig.template;

        return {
            template,
            onInit: modalConfig.onInit
        };
    }

    static getModalConfig(type) {
        switch (type) {
            case 'feedback':
                return CallbackModal;
            case 'booking':
                return BookingModal;
            default:
                return null;
        }
    }
}