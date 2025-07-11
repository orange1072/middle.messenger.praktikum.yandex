import { Block } from '../../framework/Block';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Link } from '../../components/link';
import { Label } from '../../components/label';
import { createValidator } from '../../utils/createValidator';

export class Registration extends Block {
    constructor() {
        const emailInputLabel = new Label({
            text: 'Почта',
            for: 'email',
        });
        const emailInput = new Input({
            name: 'email',
            id: 'email',
            placeholder: 'Почта',
            type: 'email',
            attr: { class: 'input-under-line' },
            events: {
                'blur:input': createValidator('email'),
            },
        });
        const loginInputLabel = new Label({
            text: 'Логин',
            for: 'login',
        });
        const loginInput = new Input({
            name: 'login',
            id: 'login',
            placeholder: 'Логин',
            type: 'text',
            attr: { class: 'input-under-line' },
            events: {
                'blur:input': createValidator('login'),
            },
        });
        const firstNameInputLabel = new Label({
            text: 'Имя',
            for: 'first_name',
        });
        const firstNameInput = new Input({
            name: 'first_name',
            id: 'first_name',
            placeholder: 'Имя',
            type: 'text',
            attr: { class: 'input-under-line' },
            events: {
                'blur:input': createValidator('first_name'),
            },
        });
        const lastNameInputLabel = new Label({
            text: 'Фамилия',
            for: 'second_name',
        });
        const lastNameInput = new Input({
            name: 'second_name',
            id: 'second_name',
            placeholder: 'Фамилия',
            type: 'text',
            attr: { class: 'input-under-line' },
            events: {
                'blur:input': createValidator('second_name'),
            },
        });
        const phoneInputLabel = new Label({
            text: 'Телефон',
            for: 'phone',
        });
        const phoneInput = new Input({
            name: 'phone',
            id: 'phone',
            placeholder: 'Телефон',
            type: 'tel',
            attr: { class: 'input-under-line' },
            events: {
                'blur:input': createValidator('phone'),
            },
        });
        const passwordInputLabel = new Label({
            text: 'Пароль',
            for: 'password',
        });
        const passwordInput = new Input({
            name: 'password',
            id: 'password',
            placeholder: 'Пароль',
            type: 'password',
            attr: { class: 'input-under-line' },
            events: {
                'blur:input': createValidator('password'),
            },
        });
        const passwordRepeatInputLabel = new Label({
            text: 'Пароль (ещё раз)',
            for: 'passwordRepeat',
        });
        const passwordRepeatInput = new Input({
            id: 'passwordRepeat',
            name: 'passwordRepeat',
            placeholder: 'Пароль (ещё раз)',
            type: 'password',
            attr: { class: 'input-under-line' },
        });

        const submitButton = new Button({
            text: 'Зарегистрироваться',
            type: 'submit',
            events: {
                click: (e) => {
                    e.preventDefault();

                    // Собираем все элементы
                    const emailEl = document.getElementById(
                        'email',
                    ) as HTMLInputElement;
                    const loginEl = document.getElementById(
                        'login',
                    ) as HTMLInputElement;
                    const firstNameEl = document.getElementById(
                        'first_name',
                    ) as HTMLInputElement;
                    const secondNameEl = document.getElementById(
                        'second_name',
                    ) as HTMLInputElement;
                    const phoneEl = document.getElementById(
                        'phone',
                    ) as HTMLInputElement;
                    const passwordEl = document.getElementById(
                        'password',
                    ) as HTMLInputElement;
                    const passwordRepeatEl = document.getElementById(
                        'passwordRepeat',
                    ) as HTMLInputElement;

                    // Массив полей
                    const fields = [
                        { key: 'email', el: emailEl },
                        { key: 'login', el: loginEl },
                        { key: 'first_name', el: firstNameEl },
                        { key: 'second_name', el: secondNameEl },
                        { key: 'phone', el: phoneEl },
                        { key: 'password', el: passwordEl },
                    ] as const;

                    type FieldKey =
                        | 'email'
                        | 'login'
                        | 'first_name'
                        | 'second_name'
                        | 'phone'
                        | 'password';
                    // Создаем валидаторы
                    const validators: Record<FieldKey, EventListener> = {
                        email: createValidator('email'),
                        login: createValidator('login'),
                        first_name: createValidator('first_name'),
                        second_name: createValidator('second_name'),
                        phone: createValidator('phone'),
                        password: createValidator('password'),
                    };

                    // Запускаем валидацию всех полей
                    fields.forEach(({ key, el }) => {
                        validators[key]({ target: el } as unknown as Event);
                    });

                    // Проверяем ошибки
                    const errors = fields.filter(({ el }) =>
                        el.classList.contains('invalid'),
                    );

                    if (errors.length > 0) {
                        console.log('❌ Форма содержит ошибки');
                    } else {
                        // Проверяем совпадение паролей
                        if (passwordEl.value !== passwordRepeatEl.value) {
                            console.log('❌ Пароли не совпадают');
                            passwordEl.classList.add('invalid');
                            passwordRepeatEl.classList.add('invalid');
                        } else {
                            passwordEl.classList.remove('invalid');
                            passwordRepeatEl.classList.remove('invalid');

                            console.log('✅ Форма валидна!');
                            const data = {
                                email: emailEl.value,
                                login: loginEl.value,
                                first_name: firstNameEl.value,
                                second_name: secondNameEl.value,
                                phone: phoneEl.value,
                                password: passwordEl.value,
                            };
                            console.log('📦 Данные формы:', data);
                        }
                    }
                },
            },
            attr: { class: 'btn btn-primary btn-registration' },
        });

        const loginLink = new Link({
            text: 'Войти',
            href: '/login',
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    alert('Переход на страницу входа');
                },
            },
            attr: { class: 'enter-link' },
        });

        super({
            loginInputLabel,
            firstNameInputLabel,
            lastNameInputLabel,
            phoneInputLabel,
            passwordInputLabel,
            passwordRepeatInputLabel,
            emailInputLabel,
            emailInput,
            loginInput,
            firstNameInput,
            lastNameInput,
            phoneInput,
            passwordInput,
            passwordRepeatInput,
            submitButton,
            loginLink,
            errorMessage: 'Пароли не совпадают',
        });
    }

    protected render(): string {
        return `
<div class="registration-page">
      <form  class="form-container" id="myForm">
        <h1>Регистрация</h1>
        {{{emailInputLabel}}}
        {{{emailInput}}}
        {{{loginInputLabel}}}
        {{{loginInput}}}
        {{{firstNameInputLabel}}}
        {{{firstNameInput}}}
        {{{lastNameInputLabel}}}
        {{{lastNameInput}}}
        {{{phoneInputLabel}}}
        {{{phoneInput}}}
        {{{passwordInputLabel}}}
        {{{passwordInput}}}
        {{{passwordRepeatInputLabel}}}
        {{{passwordRepeatInput}}}

        <p class="error-message">{{errorMessage}}</p>

        {{{submitButton}}}
        {{{loginLink}}}
      </form>
      </div>
    `;
    }
}
