import { Block } from '../../framework/Block';

type TLinkProps = {
    id?: string;
    text: string;
    href: string;
    dataPage?: string;
    events?: {
        click?: (e: Event) => void;
    };
    attr?: Record<string, string | boolean | number>;
    hasIcon?: boolean;
    iconClass?: string;
    iconStyle?: string;
    src?: string;
};

export class Link extends Block<TLinkProps> {
    constructor(props: TLinkProps) {
        super(props);
    }

    protected render(): string {
        return `  <a class="{{class}}" id="{{id}}" href="{{href}}" data-page="{{dataPage}}">
            {{#if hasIcon}}
                <img src="{{src}}" alt="{{text}}" 
                     class="link-icon {{#if iconClass}}{{iconClass}}{{/if}}"
                     {{#if iconStyle}}style="{{iconStyle}}"{{/if}}>
            {{/if}}
            {{text}}
        </a>`;
    }
}
