import { Block } from '../../framework/Block';

type TInputProps = {
    value?: string;
    id?: string;
    type?: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    events?: Record<string, EventListener>;
    attr?: Record<string, string | boolean | number>;
    error?: string | null;
};

export class Input extends Block<TInputProps> {
    constructor(props: TInputProps) {
        super(props);
    }
    protected render(): string {
        return `
<div class="form-field">
    <input 
        id="{{id}}" 
        name="{{name}}" 
        type="{{type}}"  
        placeholder="{{placeholder}}" 
        value="{{value}}"
        {{#if disabled}}disabled{{/if}} 
        {{#if required}}required{{/if}} 
    />
    <div class="error-message" id="{{id}}-error">{{error}}</div>
</div>
        `;
    }
}
