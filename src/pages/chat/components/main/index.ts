import { Block } from '../../../../framework/Block';
import { Input } from '../../../../components/input';

export class Main extends Block {
    constructor() {
        const messageInput = new Input({
            name: 'message',
            type: 'text',
            attr: { class: 'chat-message' },
            id: 'message',
            placeholder: 'Сообщение',
        });

        const defaultBlock = ` <div class="message-area"> Выберите чат чтобы отправить сообщение</div>`;

        super({ defaultBlock, messageInput });
    }
    protected render(): string {
        return `
      <div class="chat-data-message-container">
<!--      {{{defaultBlock}}}-->
      <div class="chat-enter-message"> 
    <div class="chat-download-container"> <img class="chat-download" 
      src="/static/download.png"  alt="sendMessage">  </div> 
       <div class="chat-message-container"> {{{messageInput}}}</div>
      <div class="chat-sendmsg-container"><img class="chat-sendmsg" 
      src="/static/sendMessage.png" alt="sendMessage"></div>
      
      </div>
</div>

        `;
    }
}
