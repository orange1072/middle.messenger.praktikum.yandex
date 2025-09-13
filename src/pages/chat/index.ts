import { Main } from './components/main';
import { Block } from '../../framework/Block';
import { ChatItem } from './components/chat-item';
import { MainPageHeader } from './components/header';
import { AuthAPI } from '../../api/auth';

export class Chat extends Block {
    constructor() {
        const main = new Main();
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
        const header = new MainPageHeader();

        super({
            chatItem,
            header,
            main,
        });
    }

    protected render(): string {
        return `
        <div class="chat-data-container">
        <div class ="chat-data-container-content">
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
