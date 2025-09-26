import { Block } from '../../framework/Block';

type TTextProps = {
    text: string;
    attr?: Record<string, string | boolean | number>;
};

export class Text extends Block<TTextProps> {
    constructor(props: TTextProps) {
        super(props);
    }

    protected render(): string {
        return `<p class="{{class}}" id="{{id}}" >{{text}}</p>`;
    }
}
