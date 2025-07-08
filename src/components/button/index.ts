import { Block } from '../../framework/Block';

type TButtonProps = {
    text: string;
    type?: string;
    events?: {
        click?: (e: Event) => void;
    };
    attr?: Record<string, string | boolean | number>;
};

export class Button extends Block<TButtonProps> {
    constructor(props: TButtonProps) {
        super(props);
    }

    protected render(): string {
        return `<button id="{{id}}" type="{{type}}"   {{#if disabled}} disabled {{/if}}>{{text}}</button>`;
    }
}
