import { Block } from '../../framework/Block';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { Avatar } from '../../components/avatar';

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
                    console.log(e);
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
