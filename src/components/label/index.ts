import { Block } from '../../framework/Block';

type TLabelProps = {
    for?: string;
    text?: string;
    attr?: Record<string, string | boolean | number>;
};

export class Label extends Block<TLabelProps> {
    constructor(props: TLabelProps) {
        super(props);
    }

    protected render(): string {
        return `<label  for="{{for}}">{{text}}</button>`;
    }
}
