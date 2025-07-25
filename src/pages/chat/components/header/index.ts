import { Link } from '../../../../components/link';
import { Block } from '../../../../framework/Block';
import { Input } from '../../../../components/input';
import { Avatar } from '../../../../components/avatar';

export class MainPageHeader extends Block {
    constructor() {
        const mainHeaderLink = new Link({
            text: 'Профиль >',
            dataPage: 'ProfilePage',
            href: '#',
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    alert('Переход на страницу входа');
                },
            },
            attr: { class: 'main-header-link' },
        });

        const mainHeaderSearchInput = new Input({
            name: 'search',
            placeholder: 'Поиск',
            type: 'search',
            attr: { class: 'main-header-input' },
        });

        const messageAvatar = new Avatar({
            src: 'avatar',
            attr: { class: 'chat-row-avatar' },
        });

        super({
            messageAvatar,
            mainHeaderLink,
            mainHeaderSearchInput,
        });
    }

    protected render(): string {
        return `
<div class="main-header" >
    <form class="main-header-form form-container" action="">
        {{{mainHeaderSearchInput}}}
        {{{mainHeaderLink}}}
    </form>
</div>
    `;
    }
}
