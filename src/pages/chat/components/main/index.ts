import { Block } from '../../../../framework/Block';
import { Input } from '../../../../components/input';
import { ChatsAPI, ChatUserDTO } from '../../../../api/chats';
import { ChatSocket } from '../../../../utils/socket';

type TProps = {
    userId?: number;
    chatId?: number;
    token?: string;
    defaultBlock?: string;
    messageInput?: Input;
    messages?: { content: string; time?: string; isMine?: boolean }[];
    events?: Record<string, EventListener>;
    users?: ChatUserDTO[];
};

export class Main extends Block<TProps> {
    private socket: ChatSocket | null = null;

    constructor(props: TProps = {}) {
        const messageInput = new Input({
            name: 'message',
            type: 'text',
            attr: { class: 'chat-message' },
            id: 'message',
            placeholder: 'Сообщение',
            events: {
                'keydown:input': (e: Event) => {
                    const ev = e as KeyboardEvent;
                    if (ev.key === 'Enter') {
                        const input = ev.target as HTMLInputElement;
                        const text = (input?.value || '').trim();
                        if (text) {
                            this.sendMessage(text);
                            input.value = '';
                        }
                    }
                },
            },
        });

        const defaultBlock = ` <div class="message-area"> Выберите чат чтобы отправить сообщение</div>`;

        super({
            ...props,
            defaultBlock,
            messageInput,
            messages: [],
            users: [],
            events: {
                'click:.chat-sendmsg-container': () => {
                    const input = document.getElementById('message') as HTMLInputElement | null;
                    const text = (input?.value || '').trim();
                    if (text) {
                        this.sendMessage(text);
                        if (input) input.value = '';
                    }
                },
            },
        });
    }

    protected componentDidUpdate(_oldProps: TProps, _newProps: TProps): boolean {
        if (this.props.userId && this.props.chatId && !this.socket) {
            const api = new ChatsAPI();
            api.getToken(this.props.chatId).then(({ token }) => {
                this.socket = new ChatSocket(
                    this.props.userId as number,
                    this.props.chatId as number,
                    token,
                    {
                        onMessage: (data) => this.handleIncoming(data),
                    },
                );
                this.socket.connect();
            });
            api.getUsers(this.props.chatId).then((users) => this.setProps({ users }));
        }
        const list = this.element?.querySelector('.messages-list') as HTMLElement | null;
        if (list) {
            list.scrollTop = list.scrollHeight;
        }
        return true;
    }

    private sendMessage(text: string) {
        this.socket?.send(text);
        const next = (this.props.messages || []).concat({
            content: text,
            isMine: true,
            time: new Date().toLocaleTimeString(),
        });
        this.setProps({ messages: next });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private handleIncoming(payload: any) {
        const append = (msg: any) => {
            if (msg.type !== 'message') return;
            const next = (this.props.messages || []).concat({
                content: String(msg.content ?? ''),
                time: msg.time,
                isMine: false,
            });
            this.setProps({ messages: next });
        };
        if (Array.isArray(payload)) {
            payload.forEach(append);
        } else {
            append(payload);
        }
    }
    protected render(): string {
        return `
      <div class="chat-data-message-container">
<!--      {{{defaultBlock}}}-->
      <div class="messages-pane">
        <div class="main-chat-header">
          <div class="chat-companion">Вадим</div>
          <div class="chat-header-actions">⋯</div>
        </div>
        <div class="messages-list">
          ${((this.props.messages || []).map((m) => `
            <div class="message-row${m.isMine ? ' mine' : ''}">
              <div class="message-bubble">${m.content}</div>
              <div class="message-time">${m.time ?? ''}</div>
            </div>`)).join('')}
        </div>
        <div class="chat-enter-message"> 
          <div class="chat-download-container"> <img class="chat-download" 
            src="/static/download.png"  alt="sendMessage">  </div> 
          <div class="chat-message-container"> {{{messageInput}}}</div>
          <div class="chat-sendmsg-container"><img class="chat-sendmsg" 
            src="/static/sendMessage.png" alt="sendMessage"></div>
        </div>
      </div>
      <div class="users-list">
        ${((this.props.users || []).map((u) => {
            const avatarSrc = u.avatar ? `https://ya-praktikum.tech/api/v2/resources${u.avatar}` : '/static/download.png';
            const displayName = u.display_name || `${u.first_name} ${u.second_name}`;
            return `
          <div class="user-row">
            <img class="user-avatar" src="${avatarSrc}" alt="${displayName}" />
            <div class="user-info">
              <div class="user-name">${displayName}</div>
              <div class="user-login">@${u.login}</div>
            </div>
          </div>`;
        })).join('')}
      </div>
</div>

        `;
    }
}
