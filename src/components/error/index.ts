import { Block } from '../../framework/Block';

type TErrorProps = {
    text: string;
    events?: {
        click?: (e: Event) => void;
    };
    attr?: Record<string, string | boolean | number>;
};

export class ErrorBlock extends Block<TErrorProps> {
    constructor(props: TErrorProps) {
        super(props);
    }

    protected render(): string {
        return `<span class="{{class}}" id="{{id}}" >{{text}}</span>`;
    }
}
