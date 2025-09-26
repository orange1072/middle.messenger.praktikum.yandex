import { Block } from '../../framework/Block';

type TAvatarProps = {
    attr?: Record<string, string | boolean | number>;
    src?: string;
    alt?: string;
};

export class Avatar extends Block<TAvatarProps> {
    constructor(props: TAvatarProps) {
        super(props);
    }

    protected render(): string {
        return `<img class="{{class}}" src="/{{src}}" alt="Avatar" />`;
    }
}
