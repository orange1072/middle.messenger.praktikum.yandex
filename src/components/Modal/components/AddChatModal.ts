import { Input } from '../../input';
import { Text } from '../../text';
import { Block } from '../../../framework/Block';
import { Button } from '../../button';
import { ChatsAPI } from '../../../api/chats';

export class AddChatModal extends Block {
    constructor() {
        const createChatApi = new ChatsAPI();
        const textBlock = new Text({
            text: 'Добавить чат',
        });

        const chatNameInput = new Input({
            name: 'chatNameInput',
            id: 'chatNameInput',
            attr: { class: 'input-under-line' },
        });

        const submitButton = new Button({
            text: 'Добавить',
            attr: { class: 'btn btn-primary' },
            events: {
                click: async (e) => {
                    console.log('click');
                    e.preventDefault();
                    const chatNameInput: HTMLInputElement =
                        document.getElementById('chatNameInput') as HTMLInputElement;
                    const title = chatNameInput?.value;
                    try {
                        await createChatApi.create(title);
                    } catch (e) {
                        console.error('Не удалось добавить чат', e);
                    }
                },
            },
        });

        super({
            textBlock,
            chatNameInput,
            submitButton,
        });
    }
    protected render(): string {
        return `
<div id="addChatModal" class="modal-form">
   {{{textBlock}}}
   {{{chatNameInput}}}
   {{{submitButton}}}
</div>
        `;
    }
}
