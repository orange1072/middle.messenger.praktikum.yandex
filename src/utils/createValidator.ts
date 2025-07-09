import { validationRules, errorMessages } from './validationRules';

export type Validator = (event: Event) => void;

export function createValidator(id: string): Validator {
    return (event) => {
        const input = event.target as HTMLInputElement;
        const rule = validationRules[id];
        if (!rule) {
            console.warn(`⚠️ Для поля ${id} нет правила валидации`);
            return;
        }
        const value = input.value.trim();
        const errorContainer = document.getElementById(`${id}-error`);

        if (!rule.test(value)) {
            input.classList.add('invalid');
            if (errorContainer) {
                errorContainer.textContent =
                    errorMessages[id] || 'Некорректное значение';
            }
            console.log(`❌ Поле ${id} невалидно: ${value}`);
        } else {
            input.classList.remove('invalid');
            if (errorContainer) {
                errorContainer.textContent = '';
            }
            console.log(`✅ Поле ${id} валидно: ${value}`);
        }
    };
}
