import { Block } from '../../../../framework/Block';
import { Input } from '../../../../components/input';
import { ChatsAPI, ChatUserDTO } from '../../../../api/chats';
import { ChatSocket } from '../../../../utils/socket';
import { Link } from '../../../../components/link';
import { Router } from '../../../../framework/Router';
import { AuthAPI } from '../../../../api/auth';
import { store } from '../../../../store';

type TProps = {
    userId?: number;
    chatId?: number;
    token?: string;
    selectedChatTitle?: string;
    defaultBlock?: string;
    messageInput?: Input;
    messages?: { content: string; time?: string; isMine?: boolean }[];
    events?: Record<string, EventListener>;
    users?: ChatUserDTO[];
    isChatSelected?: boolean;
    addChat?: Link;
    addUserLink?: Link;
    iconModalLink?: Link;
    deleteUserLink?: Link;
};

export class Main extends Block<TProps> {
    private socket: ChatSocket | null = null;

    constructor(props: TProps) {
        const iconModalLink = new Link({
            id: 'icon-modal',
            text: '',
            hasIcon: true,
            href: '',
            events: {
                click: (e) => {
                    e.preventDefault();
                    const block = document.getElementById('hiddenModal');
                    if (block) {
                        block.classList.toggle('active');
                    }
                },
            },
            src: '../../../../../static/Ellipse%2031.png',
            iconClass: 'modal-icon-size',
            iconStyle: 'width: 22px; height: 22px;',
        });

        const addUserLink = new Link({
            text: 'Добавить пользователя',
            hasIcon: true,
            href: '',
            events: {
                click: (e) => {
                    e.preventDefault();
                    const block = document.getElementById('userAddModal');
                    if (block) {
                        block.classList.toggle('active');
                    }
                },
            },
            src: '../../../../../static/add.png',
            iconClass: 'modal-icon-size',
            iconStyle: 'width: 22px; height: 22px;',
        });

        const deleteUserLink = new Link({
            text: 'Удалить пользователя',
            hasIcon: true,
            href: '',
            events: {
                click: (e) => {
                    e.preventDefault();
                    const block = document.getElementById('deleteUserModal');
                    if (block) {
                        block.classList.toggle('active');
                    }
                },
            },
            src: '../../../../../static/delete.png',
            iconClass: 'modal-icon-size',
            iconStyle: 'width: 22px; height: 22px;',
        });

        const addChat = new Link({
            text: 'Добавить чат',
            hasIcon: true,
            href: '',
            events: {
                click: (e) => {
                    e.preventDefault();
                    const block = document.getElementById('addChatModal');
                    if (block) {
                        block.classList.toggle('active');
                    }
                },
            },
            src: '../../../../../static/chat.png',
            iconClass: 'modal-icon-size',
            iconStyle: 'width: 22px; height: 22px;',
        });

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

        super({
            ...props,
            isChatSelected: false,
            addChat,
            messageInput,
            addUserLink,
            iconModalLink,
            deleteUserLink,
            messages: [],
            users: [],
        });

        this.router = new Router();
    }

    protected componentDidMount(): void {
        this.setupChatSelection();
    }

    private setupChatSelection(): void {
        setTimeout(() => {
            const chatRows = document.querySelectorAll('.chat-row');
            chatRows.forEach((row) => {
                row.addEventListener('click', async () => {
                    await this.handleChatSelection(row);
                });
            });
        }, 1000);
    }

    private async handleChatSelection(row: Element): Promise<void> {
        try {
            const authAPI = new AuthAPI();
            const chatsAPI = new ChatsAPI();

            const userInfo = await authAPI.getUser();
            const userId = userInfo.id;

            const chatId = row.getAttribute('data-chat-id');
            const chatTitle = row.getAttribute('data-chat-title');

            if (!chatId || !userId) {
                console.error('Chat ID or User ID not found');
                return;
            }

            const numericChatId = Number(chatId);

            // Сохраняем текущий чат в store
            store.setCurrentChat({
                id: numericChatId,
                title: chatTitle || 'Без названия',
            });

            // Получаем токен для WebSocket
            const tokenResponse = await chatsAPI.getToken(numericChatId);

            // Обновляем состояние компонента
            this.setProps({
                userId: userId,
                chatId: numericChatId,
                token: tokenResponse.token,
                selectedChatTitle: chatTitle || '',
                isChatSelected: true,
                messages: [], // Очищаем сообщения при смене чата
            });

            // Закрываем предыдущее соединение
            if (this.socket) {
                this.socket.disconnect();
                this.socket = null;
            }
        } catch (error) {
            console.error('Error selecting chat:', error);
        }
    }
    protected componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
        // Создаем WebSocket соединение когда есть все необходимые данные
        if (
            newProps.userId &&
            newProps.chatId &&
            newProps.token &&
            !this.socket
        ) {
            this.initializeSocket(
                newProps.userId,
                newProps.chatId,
                newProps.token,
            );
        }

        // Прокручиваем к последнему сообщению
        this.scrollToLatestMessage();

        return true;
    }

    private initializeSocket(
        userId: number,
        chatId: number,
        token: string,
    ): void {
        this.socket = new ChatSocket(userId, chatId, token, {
            onOpen: () => {
                console.log('WebSocket connection established');
            },
            onMessage: (data) => {
                this.handleIncoming(data);
            },
            onError: (e) => {
                console.error('WebSocket error:', e);
            },
            onClose: (e) => {
                console.log('WebSocket connection closed:', e);
                this.socket = null;
            },
        });

        this.socket.connect();

        // Загружаем пользователей чата
        this.loadChatUsers(chatId);
    }

    private async loadChatUsers(chatId: number): Promise<void> {
        try {
            const chatsAPI = new ChatsAPI();
            const users = await chatsAPI.getUsers(chatId);
            this.setProps({ users });
        } catch (error) {
            console.error('Error loading chat users:', error);
        }
    }

    private sendMessage(text: string): void {
        if (!this.socket) {
            console.error('WebSocket not connected');
            return;
        }

        this.socket.send(text);

        // Добавляем сообщение в локальное состояние
        const newMessage = {
            content: text,
            isMine: true,
            time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
        };

        const nextMessages = (this.props.messages || []).concat(newMessage);
        this.setProps({ messages: nextMessages });
    }

    private handleIncoming(payload: any): void {
        // Игнорируем ping/pong сообщения
        if (payload?.type === 'pong' || payload?.type === 'ping') {
            return;
        }

        const appendMessage = (msg: any) => {
            if (msg.type !== 'message' || !msg.content) return;

            const newMessage = {
                content: String(msg.content),
                time: msg.time
                    ? new Date(msg.time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                      })
                    : new Date().toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                      }),
                isMine: msg.user_id === this.props.userId,
            };

            const nextMessages = (this.props.messages || []).concat(newMessage);
            this.setProps({ messages: nextMessages });
        };

        if (Array.isArray(payload)) {
            // Старые сообщения приходят массивом
            const reversedMessages = payload.reverse(); // Переворачиваем чтобы старые были первыми
            const nextMessages = reversedMessages.map((msg) => ({
                content: String(msg.content || ''),
                time: msg.time
                    ? new Date(msg.time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                      })
                    : '',
                isMine: msg.user_id === this.props.userId,
            }));

            this.setProps({ messages: nextMessages });
        } else {
            appendMessage(payload);
        }
    }

    private scrollToLatestMessage(): void {
        const messagesPane = this.element?.querySelector(
            '.messages-pane',
        ) as HTMLElement | null;
        if (messagesPane) {
            // Небольшая задержка для гарантии что DOM обновился
            setTimeout(() => {
                messagesPane.scrollTop = messagesPane.scrollHeight;
            }, 0);
        }
    }

    protected render(): string {
        const { isChatSelected, selectedChatTitle, messages = [] } = this.props;

        if (!isChatSelected) {
            return `
                <div class="chat-data-message-container">
                    <div id="defaultBlock" class="block-without-chat active">
                        Выберите чат чтобы отправить сообщение
                    </div>
                </div>
            `;
        }

        return `
      <div class="chat-data-message-container">
        <div id="defaultBlock" class="block-without-chat unactive">
            Выберите чат чтобы отправить сообщение
        </div>
     
        <div class="messages-pane">
            <div id="main-chat-header" class="main-chat-header active">
                <div class="chat-companion">${selectedChatTitle || 'Чат'}</div>
                <div class="icon-modal-open">{{{iconModalLink}}}</div>
                <div id="hiddenModal" class="chat-header-actions">
                    <div class="modal">
                        {{{addUserLink}}}
                        {{{deleteUserLink}}}
                        {{{addChat}}}
                    </div>
                </div>
            </div>
            
            <div class="messages-list">
                ${messages
                    .map(
                        (m) => `
                    <div class="message-row${m.isMine ? ' mine' : ''}">
                        <div class="message-bubble">${m.content}</div>
                        <div class="message-time">${m.time || ''}</div>
                    </div>
                `,
                    )
                    .join('')}
            </div>
            
            <div id="chatEnterMessage" class="chat-enter-message active">
                <div class="chat-download-container">
                    <img class="chat-download" src="/static/download.png" alt="sendMessage">
                </div>
                <div class="chat-message-container">{{{messageInput}}}</div>
                <div class="chat-sendmsg-container">
                    <img class="chat-sendmsg" src="/static/sendMessage.png" alt="sendMessage">
                </div>
            </div>
        </div>
      </div>
        `;
    }
}
