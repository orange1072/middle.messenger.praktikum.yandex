import { Block } from '../../framework/Block';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Link } from '../../components/link';
import { Label } from '../../components/label';
import { initFieldValidation } from '../../utils/validationRules';

export class Login extends Block {
    constructor() {
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
            required: true,
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
            required: true,
        });
        const submitButton = new Button({
            text: 'Авторизоваться',
            type: 'submit',
            events: {
                click: (e) => {
                    console.log(e);
                },
            },
            attr: { class: 'btn,btn-primary,btn-authorization' },
        });

        const returnChatLink = new Link({
            text: 'Нет аккаунта?',
            href: '/RegistrationPage',
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    alert('Переход на страницу входа');
                },
            },
            attr: { class: 'no-account-link' },
        });

        super({
            loginInputLabel,
            passwordInputLabel,
            loginInput,
            passwordInput,
            submitButton,
            returnChatLink,
        });
    }
    protected componentDidMount(): void {
        initFieldValidation('login');
        initFieldValidation('password');
    }
    protected render(): string {
        return `
<div  class="login-page">
      <form id="myForm" class="form-container"  >
        <h1>Вход</h1>
      
        {{{loginInputLabel}}}
        {{{loginInput}}}
        
        {{{passwordInputLabel}}}
        {{{passwordInput}}}

        {{{submitButton}}}
        {{{returnChatLink}}}
      </form>
      </div>
    `;
    }
}
