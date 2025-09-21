import { Main } from './components/main';
import { Block } from '../../framework/Block';
import { ChatItem } from './components/chat-item';
import { MainPageHeader } from './components/header';
import { AuthAPI } from '../../api/auth';
import { Link } from '../../components/link';
import { Router } from '../../framework/Router';
import { AddUserModal } from '../../components/Modal/components/AddUserModal';
import { DeleteUserModal } from '../../components/Modal/components/DeleteUserModal';

export class Chat extends Block {
    constructor() {
        const main = new Main();
        const modalAdd = new AddUserModal();
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
        });
    }

    protected render(): string {
        return `
        <div class="chat-data-container">
        {{{modalAdd}}}
        {{{modalDelete}}}
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
