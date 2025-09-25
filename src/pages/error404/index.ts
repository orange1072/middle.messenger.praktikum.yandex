import { Block } from '../../framework/Block';
import { Link } from '../../components/link';
import { Router } from '../../framework/Router';

export class Error404 extends Block {
    constructor() {
        const router = new Router();
        const returnLink = new Link({
            text: 'Вернуться к чатам',
            attr: { class: 'return-link' },
            href: '',
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
  <h1>404</h1>
    <h2>Не туда попали</h2>
    {{{returnLink}}}
</div>
              `;
    }
}
