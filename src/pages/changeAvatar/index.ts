import { Block } from '../../framework/Block';
import { Input } from '../../components/input';
import { Button } from '../../components/button';

export class ChangeAvatar extends Block {
    constructor() {
        const inputAvatarChange = new Input({
            name: 'avatar',
            id: 'avatar',
            type: 'file',
            attr: { class: 'change-avatar-input' },
        });

        const buttonAvatarChange = new Button({
            text: 'Поменять',
            type: 'submit',
            attr: { class: 'btn btn-primary btn-save change-avatar-btn' },
        });

        super({
            inputAvatarChange,
            buttonAvatarChange,
        });
    }

    protected render(): string {
        return `
       <div class="change-avatar">
    <h3>Загрузите файл</h3>
    <form action="">
        {{{inputAvatarChange}}}
        {{{buttonAvatarChange}}}
    </form>
</div>
              `;
    }
}
