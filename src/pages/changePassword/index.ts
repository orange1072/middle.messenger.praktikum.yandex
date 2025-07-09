import { Block } from '../../framework/Block';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { Avatar } from '../../components/avatar';
import { createValidator } from '../../utils/createValidator';

export class ChangePassword extends Block {
    constructor() {
        const avatar = new Avatar({
            src: 'avatar',
            attr: { class: 'profile-avatar' },
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
            value: '12345',
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
            value: '12345',
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
            value: '12345',
            type: 'password',
        });

        const submitButton = new Button({
            text: 'Сохранить',
            type: 'submit',
            events: {
                click: (e) => {
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
                            login: oldPasswordEl?.value,
                            password: newPasswordEl?.value,
                        };
                        console.log('📦 Данные формы:', data);
                    }
                },
            },
            attr: { class: 'btn btn-primary btn-save' },
        });

        super({
            avatar,
            oldPasswordInputLabel,
            oldPasswordInput,
            newPasswordInputLabel,
            newPasswordInput,
            newPasswordRepeatInputLabel,
            newPasswordRepeatInput,
            submitButton,
        });
    }

    protected render(): string {
        return `
<div class="change-password-page">
{{{avatar}}}
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
    `;
    }
}
