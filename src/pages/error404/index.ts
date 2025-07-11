import { Block } from '../../framework/Block';
import { Link } from '../../components/link';

export class Error404 extends Block {
    constructor() {
        const returnLink = new Link({
            text: 'Вернуться к чатам',
            attr: { class: 'return-link' },
            href: '#',
            dataPage: 'MainContent',
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
