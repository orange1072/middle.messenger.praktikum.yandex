import { Block } from '../../framework/Block';

type TLinkProps = {
    text: string;
    href: string;
    dataPage?: string;
    events?: {
        click?: (e: Event) => void;
    };
    attr?: Record<string, string | boolean | number>;
};

export class Link extends Block<TLinkProps> {
    constructor(props: TLinkProps) {
        super(props);
    }

    protected render(): string {
        return `<a class="{{class}}" id="{{id}}" href="{{href}}" data-page="{{data-page}}">{{text}}</a>`;
    }
}
