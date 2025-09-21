import { Block } from '../../../../framework/Block';
import { Input } from '../../../../components/input';
import { Avatar } from '../../../../components/avatar';

export class MainPageHeader extends Block {
    constructor() {
        const mainHeaderSearchInput = new Input({
            name: 'search',
            placeholder: '🔍 Поиск',
            type: 'search',
            attr: { class: 'main-header-input' },
        });

        const messageAvatar = new Avatar({
            src: 'avatar',
            attr: { class: 'chat-row-avatar' },
        });

        super({
            messageAvatar,
            mainHeaderSearchInput,
        });
    }

    protected render(): string {
        return `
<div class="main-header" >
    <form class="main-header-form main-head-container action="">
        {{{mainHeaderSearchInput}}}
    </form>
</div>
    `;
    }
}
