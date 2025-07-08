import { Block } from '../../framework/Block';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Link } from '../../components/link';
import { Label } from '../../components/label';

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
                    console.log(e);
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
