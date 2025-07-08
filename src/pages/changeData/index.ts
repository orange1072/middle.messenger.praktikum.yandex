import { Block } from '../../framework/Block';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { Avatar } from '../../components/avatar';

export class ChangeData extends Block {
    constructor() {
        const avatar = new Avatar({
            src: 'avatar',
            attr: { class: 'profile-avatar' },
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
                input: (e) =>
                    console.log('email:', (e.target as HTMLInputElement).value),
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
        });
    }

    protected render(): string {
        return `
<div class="change-data">
  <a href="#" class="change-avatar-link"  data-page="ChangeAvatar">{{{avatar}}}</a>
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
    `;
    }
}
