import { Block } from '../../framework/Block';
import { Link } from '../../components/link';
import { Router } from '../../framework/Router';

export class Error500 extends Block {
    constructor() {
        const router = new Router();
        const returnLink = new Link({
            text: 'Вернуться к чатам',
            attr: { class: 'return-link' },
            href: '/messenger',
            dataPage: 'MainContent',
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    router.go('/messenger');
                },
            },
        });

        super({
            returnLink,
        });
    }

    protected render(): string {
        return `
        <div class="block-center">
    <h1>500</h1>
    <h2>Уже фиксим</h2>
    {{{returnLink}}}
</div>
              `;
    }
}
