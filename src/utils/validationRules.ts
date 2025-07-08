export const validationRules: Record<string, RegExp> = {
    first_name: /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
    second_name: /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
    login: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
    oldPassword: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
    newPassword: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
    phone: /^\+?\d{10,15}$/,
    message: /^(?!\s*$).+/,
};

export const errorMessages: Record<string, string> = {
    first_name: 'Первая буква заглавная, только буквы или дефис',
    second_name: 'Первая буква заглавная, только буквы или дефис',
    login: 'От 3 до 20 символов, латиница, цифры, - или _',
    email: 'Неверный формат email',
    password: 'От 8 до 40 символов, хотя бы 1 заглавная и цифра',
    oldPassword: 'От 8 до 40 символов, хотя бы 1 заглавная и цифра',
    newPassword: 'От 8 до 40 символов, хотя бы 1 заглавная и цифра',
    phone: 'От 10 до 15 цифр, может начинаться с +',
    message: 'Сообщение не может быть пустым',
};

export const initFieldValidation = (fieldId: string) => {
    const input = document.getElementById(fieldId) as HTMLInputElement | null;
    if (!input) {
        console.warn(`⚠️ Поле с id ${fieldId} не найдено в DOM`);
        return;
    }

    const errorContainer = document.getElementById(`${fieldId}-error`);

    const validate = () => {
        const rule = validationRules[fieldId];
        if (!rule) {
            console.log(`⚠️ Для поля ${fieldId} нет правила валидации`);
            return '';
        }

        const value = input.value.trim();

        if (!rule.test(value)) {
            input.classList.add('invalid');
            if (errorContainer) {
                errorContainer.textContent =
                    errorMessages[fieldId] || 'Некорректное значение';
            }
            console.log(`❌ Поле ${fieldId} невалидно: ${value}`);
            return errorMessages[fieldId] || 'Некорректное значение';
        } else {
            input.classList.remove('invalid');
            if (errorContainer) {
                errorContainer.textContent = '';
            }
            console.log(`✅ Поле ${fieldId} валидно: ${value}`);
            return '';
        }
    };

    input.addEventListener('blur', validate);

    return validate;
};

window.addEventListener('DOMContentLoaded', () => {
    const validators = [
        initFieldValidation('password'),
        initFieldValidation('login'),
        initFieldValidation('phone'),
        initFieldValidation('second_name'),
        initFieldValidation('first_name'),
        initFieldValidation('email'),
        initFieldValidation('message'),
        initFieldValidation('oldPassword'),
        initFieldValidation('newPassword'),
    ];

    const form = document.getElementById('myForm');

    if (form instanceof HTMLFormElement) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const errors = validators
                .map((fn) => (fn ? fn() : ''))
                .filter((msg) => msg !== '');

            if (errors.length > 0) {
                console.log('❌ Форма содержит ошибки:\n' + errors.join('\n'));
            } else {
                const formData = new FormData(form); // тут уже безопасно
                const data: Record<string, string> = {};
                formData.forEach((val, key) => {
                    data[key] = val.toString();
                });
                console.log('✅ Форма валидна!');
                console.log('📦 Данные формы:', data);
            }
        });
    } else {
        console.warn('⛔ Элемент с id="myForm" не является <form>');
    }
});
