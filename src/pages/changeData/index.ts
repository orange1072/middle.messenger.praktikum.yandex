import { Block } from '../../framework/Block';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { Avatar } from '../../components/avatar';
import { createValidator } from '../../utils/createValidator';
import { Link } from '../../components/link';
import { Router } from '../../framework/Router';

export class ChangeData extends Block {
    constructor() {
        const router = new Router();
        const avatar = new Avatar({
            src: 'avatar',
            attr: { class: 'profile-avatar' },
        });
        const backArrowLink = new Link({
            text: '',
            hasIcon: true,
            attr: { class: 'back-arrow' },
            href: '',
            events: {
                click: (e) => {
                    e.preventDefault();
                    router.back();
                },
            },
            src: '/static/sendMessage.png',
            iconClass: 'back-arrow-link',
            iconStyle: 'width: 40px; height: 40px;',
        });
        const changeAvatar = new Link({
            text: 'Поменять аватар',
            attr: { class: 'change-avatar-link' },
            href: '/change-avatar',
            events: { click: () => router.go('/change-avatar') },
        });
        const emailInputLabel = new Label({
            text: 'Почта',
            for: 'email',
        });
        const emailInput = new Input({
            name: 'email',
            value: 'pochta@yandex.ru',
            id: 'email',
            placeholder: 'Почта',
            type: 'email',
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
            value: 'ivanivanov',
            placeholder: 'Логин',
            type: 'text',
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
            value: 'Иван',
            type: 'text',
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
            value: 'Иванов',
            placeholder: 'Фамилия',
            type: 'text',
            events: {
                'blur:input': createValidator('second_name'),
            },
        });
        const displayNameInputLabel = new Label({
            text: 'Имя в чате',
            for: 'display_name',
        });
        const displayNameInput = new Input({
            name: 'display_name',
            id: 'display_name',
            value: 'Иван',
            placeholder: 'Фамилия',
            type: 'text',
        });
        const phoneInputLabel = new Label({
            text: 'Телефон',
            for: 'phone',
        });
        const phoneInput = new Input({
            name: 'phone',
            id: 'phone',
            value: '8 (888) 123-45-55',
            placeholder: 'Телефон',
            type: 'tel',
            events: {
                'blur:input': createValidator('phone'),
            },
        });

        const submitButton = new Button({
            text: 'Сохранить',
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

                    // Массив полей
                    const fields = [
                        { key: 'email', el: emailEl },
                        { key: 'login', el: loginEl },
                        { key: 'first_name', el: firstNameEl },
                        { key: 'second_name', el: secondNameEl },
                        { key: 'phone', el: phoneEl },
                    ] as const;

                    type FieldKey =
                        | 'email'
                        | 'login'
                        | 'first_name'
                        | 'second_name'
                        | 'phone';
                    // Создаем валидаторы
                    const validators: Record<FieldKey, EventListener> = {
                        email: createValidator('email'),
                        login: createValidator('login'),
                        first_name: createValidator('first_name'),
                        second_name: createValidator('second_name'),
                        phone: createValidator('phone'),
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
                        console.log('✅ Форма валидна!');
                        const data = {
                            email: emailEl.value,
                            login: loginEl.value,
                            first_name: firstNameEl.value,
                            second_name: secondNameEl.value,
                            phone: phoneEl.value,
                        };
                        console.log('📦 Данные формы:', data);
                    }
                },
            },
            attr: { class: 'btn btn-primary btn-save' },
        });

        super({
            avatar,
            loginInputLabel,
            firstNameInputLabel,
            lastNameInputLabel,
            phoneInputLabel,
            displayNameInputLabel,
            displayNameInput,
            emailInputLabel,
            emailInput,
            loginInput,
            firstNameInput,
            lastNameInput,
            phoneInput,
            submitButton,
            backArrowLink,
            changeAvatar,
        });
    }

    protected render(): string {
        return `
<div class="change-data">

{{{backArrowLink}}}
    
  <div class="flex-container-col">
{{{changeAvatar}}}
            <form class="profile-data form-container">
      <div class="profile-row">{{{emailInputLabel}}}
        {{{emailInput}}}</div>  
        <div class="profile-row"> {{{loginInputLabel}}}
        {{{loginInput}}}
        </div>
       <div class="profile-row"> {{{firstNameInputLabel}}}
        {{{firstNameInput}}}</div>
       <div class="profile-row">{{{lastNameInputLabel}}}
        {{{lastNameInput}}}</div> 
        <div class="profile-row">{{{displayNameInputLabel}}}
        {{{displayNameInput}}}</div>
          <div class="profile-row">
          {{{phoneInputLabel}}}
        {{{phoneInput}}}
        </div>
        {{{submitButton}}}
        </div> 
        
      </form>
      </div>
</div>
  
      
    `;
    }
}
