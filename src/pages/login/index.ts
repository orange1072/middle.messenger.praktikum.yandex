import { Block } from '../../framework/Block';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Link } from '../../components/link';
import { Label } from '../../components/label';
import { createValidator } from '../../utils/createValidator';
import { AuthAPI } from '../../api/auth';
import { Router } from '../../framework/Router';

export class Login extends Block {
    constructor() {
        const validateLogin = createValidator('login');
        const validatePassword = createValidator('password');
        const auth = new AuthAPI();
        const router = new Router('#app');
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
            events: {
                'input:input': validateLogin,
                'blur:input': validateLogin,
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
            required: true,
            events: {
                'input:input': validatePassword,
                'blur:input': validatePassword,
            },
        });
        const submitButton = new Button({
            text: 'Авторизоваться',
            type: 'submit',
            events: {
                click: async (e) => {
                    e.preventDefault();

                    const loginEl = document.getElementById(
                        'login',
                    ) as HTMLInputElement;
                    const passwordEl = document.getElementById(
                        'password',
                    ) as HTMLInputElement;

                    const validators = [validateLogin, validatePassword];

                    // вызвать валидацию всех полей
                    const errors = validators
                        .map((fn) => {
                            fn({ target: loginEl } as unknown as Event);
                            return fn === validators[0] && loginEl
                                ? loginEl.classList.contains('invalid')
                                : passwordEl.classList.contains('invalid');
                        })
                        .filter((isInvalid) => isInvalid);

                    if (errors.length > 0) {
                        console.log('❌ Форма содержит ошибки');
                    } else {
                        console.log('✅ Форма валидна!');
                        const data = {
                            login: loginEl?.value,
                            password: passwordEl?.value,
                        };
                        try {
                            await auth.signin(data);
                            router.go('/messenger');
                        } catch (error) {
                            console.error('❌ Ошибка регистрации:', error);
                        }
                        console.log('📦 Данные формы:', data);
                    }
                },
            },
            attr: { class: 'btn btn-primary btn-authorization' },
        });

        const returnChatLink = new Link({
            text: 'Нет аккаунта?',
            href: '/sign-up',
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
