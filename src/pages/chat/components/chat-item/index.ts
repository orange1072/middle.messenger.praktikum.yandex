import { Block } from '../../../../framework/Block';
import { Avatar } from '../../../../components/avatar';
import { mockUsers } from '../../../../constants';
import { Main } from '../main';

export class ChatItem extends Block {
    constructor() {
        const messageAvatar = new Avatar({
            src: 'avatar',
            attr: { class: 'chat-row-avatar' },
        });
        const main = new Main();
        super({ messageAvatar, main });
    }

    protected render(): string {
        return `

<div class="chat-data">
${mockUsers
    .map(
        (item) => `
            <div class="chat-row">
                {{{messageAvatar}}}
            <div class="chat-content">
            <div class="chat-header">
            <span class="chat-name">${item.name}</span>
             <span class="chat-time">${item.time}</span>
                </div>
                <div class="chat-subtitle">${item.message}</div>
            </div>
            <div class="chat-badge">${item.bage}</div>
        </div>
`,
    )
    .join('')}

</div>

    `;
    }
}
