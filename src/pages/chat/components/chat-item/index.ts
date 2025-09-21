import { Block } from '../../../../framework/Block';
import { Avatar } from '../../../../components/avatar';
import { ChatsAPI, ChatDTO } from '../../../../api/chats';
import { Main } from '../main';

type TProps = {
    onSelectChat?: (chat: ChatDTO) => void;
    chats?: ChatDTO[];
    messageAvatar?: Avatar;
    main?: Main;
    events?: Record<string, EventListener>;
};

export class ChatItem extends Block<TProps> {
    constructor(props: TProps = {}) {
        const messageAvatar = new Avatar({
            src: 'avatar',
            attr: { class: 'chat-row-avatar' },
        });
        const main = new Main();
        super({
            ...props,
            messageAvatar,
            main,
            chats: props.chats ?? [],
            events: {
                'click:.chat-data': (e: Event) => {
                    const target = e.target as HTMLElement;
                    const row = target.closest(
                        '.chat-row',
                    ) as HTMLElement | null;
                    if (!row) return;
                    const chatId = Number(row.dataset.chatId);
                    const title = row.dataset.chatTitle || '';
                    if (this.props.onSelectChat) {
                        this.props.onSelectChat({ id: chatId, title });
                    }
                },
            },
        });
    }

    protected async componentDidMount(): Promise<void> {
        const api = new ChatsAPI();
        try {
            const chats = await api.list();
            this.setProps({ chats });
        } catch (e) {
            console.error('Failed to load chats', e);
        }
    }

    protected render(): string {
        return `

<div class="chat-data">
${(this.props.chats || [])
    .map(
        (item) => `
            <div class="chat-row" data-chat-id="${item.id}" data-chat-title="${item.title}">
                {{{messageAvatar}}}
            <div class="chat-content">
            <div class="chat-header">
            <span class="chat-name">${item.title}</span>
             <span class="chat-time"></span>
                </div>
                <div class="chat-subtitle"></div>
            </div>
            <div class="chat-badge"></div>
        </div>
`,
    )
    .join('')}

</div>

    `;
    }
}
