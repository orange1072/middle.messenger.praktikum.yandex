import { Main } from './components/main';
import { Block } from '../../framework/Block';
import { ChatItem } from './components/chat-item';
import { MainPageHeader } from './components/header';
import { AuthAPI } from '../../api/auth';
import { Link } from '../../components/link';
import { Router } from '../../framework/Router';
import { AddUserModal } from '../../components/Modal/components/AddUserModal';
import { DeleteUserModal } from '../../components/Modal/components/DeleteUserModal';
import { AddChatModal } from '../../components/Modal/components/AddChatModal';
import { Input } from '../../components/input';
import { ChatUserDTO } from '../../api/chats';

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

export class Chat extends Block {
    constructor(props: TProps) {
        const main = new Main(props);
        const modalAdd = new AddUserModal();
        const chatAdd = new AddChatModal();
        const modalDelete = new DeleteUserModal();
        const router = new Router();
        const chatItem = new ChatItem({
            onSelectChat: async (chat) => {
                try {
                    const user = await new AuthAPI().getUser();
                    main.setProps({ userId: user.id, chatId: chat.id });
                } catch (e) {
                    console.error('Failed to init chat socket', e);
                }
            },
        });
        const mainHeaderLink = new Link({
            text: 'Профиль',
            href: '/settings',
            events: {
                click: () => {
                    router.go('/settings');
                },
            },
            attr: { class: 'main-header-link' },
        });

        const header = new MainPageHeader();

        super({
            chatItem,
            header,
            main,
            mainHeaderLink,
            modalAdd,
            modalDelete,
            chatAdd,
        });
    }

    protected render(): string {
        return `
        <div class="chat-data-container">
        {{{modalAdd}}}
        {{{modalDelete}}}
        {{{chatAdd}}}
        <div class ="chat-data-container-content">
           {{{mainHeaderLink}}}
        {{{header}}}
        {{{chatItem}}}
        </div >
         <div class ="chat-data-container-content-main">
         {{{main}}}
        </div>
      </div>
        `;
    }
}
