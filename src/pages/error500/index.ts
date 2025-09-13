import { Block } from '../../framework/Block';
import { Link } from '../../components/link';

export class Error500 extends Block {
    constructor() {
        const returnLink = new Link({
            text: 'Вернуться к чатам',
            attr: { class: 'return-link' },
            href: '/messenger',
            dataPage: 'MainContent',
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
