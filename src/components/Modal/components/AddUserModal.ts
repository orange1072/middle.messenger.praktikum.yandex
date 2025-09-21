import { Input } from '../../input';
import { Text } from '../../text';
import { Block } from '../../../framework/Block';
import { Button } from '../../button';

export class AddUserModal extends Block {
    constructor() {
        const textBlock = new Text({
            text: 'Добавить пользователя',
        });

        const inputUserLogin = new Input({
            name: 'userLogin',
            id: 'inputUserLogin',
            attr: { class: 'input-under-line' },
        });

        const submitButton = new Button({
            text: 'Добавить',
            attr: { class: 'btn btn-primary' },
        });

        super({
            textBlock,
            inputUserLogin,
            submitButton,
        });
    }
    protected render(): string {
        return `
<div id="userAddModal" class="modal-form">
   {{{textBlock}}}
   {{{inputUserLogin}}}
   {{{submitButton}}}
</div>
        `;
    }
}
