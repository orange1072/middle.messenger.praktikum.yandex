import { Block } from '../../framework/Block';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { createValidator } from '../../utils/createValidator';
import { Link } from '../../components/link';
import { Router } from '../../framework/Router';
import { UsersAPI } from '../../api/users';

export class ChangePassword extends Block {
    constructor() {
        const changePassword = new UsersAPI();
        const router = new Router();
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
            iconStyle: 'width: 30px; height: 30px;',
        });
        const changeAvatar = new Link({
            text: 'Поменять аватар',
            attr: { class: 'change-avatar-link' },
            href: '/change-avatar',
            events: { click: () => router.go('/change-avatar') },
        });
        const oldPasswordInputLabel = new Label({
            text: 'Старый пароль',
            for: 'oldPassword',
        });
        const oldPasswordInput = new Input({
            name: 'oldPassword',
            id: 'oldPassword',
            placeholder: 'Пароль',
            type: 'password',
            value: '',
            events: {
                'blur:input': createValidator('oldPassword'),
            },
        });
        const newPasswordInputLabel = new Label({
            text: 'Новый пароль',
            for: 'newPassword',
        });
        const newPasswordInput = new Input({
            name: 'newPassword',
            id: 'newPassword',
            value: '',
            placeholder: 'Новый пароль',
            type: 'password',
            events: {
                'blur:input': createValidator('newPassword'),
            },
        });
        const newPasswordRepeatInputLabel = new Label({
            text: 'Повторите новый пароль',
            for: 'passwordRepeat',
        });
        const newPasswordRepeatInput = new Input({
            id: 'passwordRepeat',
            name: 'passwordRepeat',
            placeholder: 'Повторите новый пароль',
            value: '',
            type: 'password',
        });

        const submitButton = new Button({
            text: 'Сохранить',
            type: 'submit',
            events: {
                click: async (e) => {
                    e.preventDefault();

                    const oldPasswordEl = document.getElementById(
                        'oldPassword',
                    ) as HTMLInputElement;
                    const newPasswordEl = document.getElementById(
                        'newPassword',
                    ) as HTMLInputElement;

                    const validators = [
                        createValidator('oldPassword'),
                        createValidator('newPassword'),
                    ];

                    // вызвать валидацию всех полей
                    const errors = validators
                        .map((fn) => {
                            fn({ target: oldPasswordEl } as unknown as Event);
                            return fn === validators[0] && oldPasswordEl
                                ? oldPasswordEl.classList.contains('invalid')
                                : newPasswordEl.classList.contains('invalid');
                        })
                        .filter((isInvalid) => isInvalid);

                    if (errors.length > 0) {
                        console.log('❌ Форма содержит ошибки');
                    } else {
                        console.log('✅ Форма валидна!');
                        const data = {
                            oldPassword: oldPasswordEl?.value,
                            newPassword: newPasswordEl?.value,
                        };
                        try {
                            await changePassword.updatePassword(data);
                            console.log('✅ Данные успешно обновлены');
                            router.go('/settings');
                        } catch (error) {
                            console.error(
                                '❌ Ошибка при обновлении данных:',
                                error,
                            );
                        }
                        console.log('📦 Данные формы:', data);
                    }
                },
            },
            attr: { class: 'btn btn-primary btn-save' },
        });

        super({
            changeAvatar,
            oldPasswordInputLabel,
            oldPasswordInput,
            newPasswordInputLabel,
            newPasswordInput,
            newPasswordRepeatInputLabel,
            newPasswordRepeatInput,
            submitButton,
            backArrowLink,
        });
    }

    protected render(): string {
        return `
<div class="change-password-page">
 {{{backArrowLink}}} 
<div class="flex-container-row">
<div class="flex-container-col">
{{{changeAvatar}}}
      <form id="myForm" class="profile-data form-container">
      <div class="profile-row">{{{oldPasswordInputLabel}}}
        {{{oldPasswordInput}}}</div>  
        <div class="profile-row"> {{{newPasswordInputLabel}}}
        {{{newPasswordInput}}}
        </div>
       <div class="profile-row"> {{{newPasswordRepeatInputLabel}}}
        {{{newPasswordRepeatInput}}}</div>
        {{{submitButton}}}
        </div> 
      </form>
      </div>
</div>
</div>
    `;
    }
}
