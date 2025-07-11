import { Main } from './components/main';
import { Block } from '../../framework/Block';
import { ChatItem } from './components/chat-item';
import { MainPageHeader } from './components/header';

export class Chat extends Block {
    constructor() {
        const chatItem = new ChatItem();
        const header = new MainPageHeader();
        const main = new Main();

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
