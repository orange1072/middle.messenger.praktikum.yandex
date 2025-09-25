import { Block } from '../../framework/Block';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { Avatar } from '../../components/avatar';
import { createValidator } from '../../utils/createValidator';
import { Link } from '../../components/link';
import { Router } from '../../framework/Router';
import { UsersAPI } from '../../api/users';
import { AuthAPI, UserDTO } from '../../api/auth';

// Интерфейс для дочерних компонентов
type ChangeDataProps = {
    userData?: UserDTO;
    isLoading: boolean;
    avatar: Avatar;
    loginInputLabel: Label;
    firstNameInputLabel: Label;
    lastNameInputLabel: Label;
    phoneInputLabel: Label;
    displayNameInputLabel: Label;
    displayNameInput: Input;
    emailInputLabel: Label;
    emailInput: Input;
    loginInput: Input;
    firstNameInput: Input;
    lastNameInput: Input;
    phoneInput: Input;
    submitButton: Button;
    backArrowLink: Link;
    changeAvatar: Link;
};

// Интерфейс для данных формы
type FormData = {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
};

export class ChangeData extends Block<ChangeDataProps> {
    componentDidMount(): void {
        this.fetchUserData();
    }

    private async fetchUserData(): Promise<void> {
        try {
            const authAPI = new AuthAPI();
            const userData = await authAPI.getUser();

            this.setProps({ userData });

            if (this.children.profileAvatar) {
                this.children.profileAvatar.setProps({
                    src: userData.avatar || '',
                });
            }

            this.setProps({
                userData,
                isLoading: false,
            });
        } catch (error) {
            console.error('Ошибка:', error);
            this.setProps({
                isLoading: false,
            });
        }
    }

    constructor() {
        const avatar = new Avatar({
            src: '',
            attr: { class: 'profile-avatar' },
        });

        const backArrowLink = new Link({
            text: '',
            hasIcon: true,
            attr: { class: 'back-arrow' },
            href: '',
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    const router = new Router();
                    router.back();
                },
            },
            src: 'src/static/sendMessage.png',
            iconClass: 'back-arrow-link',
            iconStyle: 'width: 30px; height: 30px;',
        });

        const changeAvatar = new Link({
            text: 'Поменять аватар',
            attr: { class: 'change-avatar-link' },
            href: '/change-avatar',
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    const router = new Router();
                    router.go('/change-avatar');
                },
            },
        });

        const emailInputLabel = new Label({
            text: 'Почта',
            for: 'email',
        });

        const emailInput = new Input({
            name: 'email',
            value: '',
            id: 'email',
            placeholder: 'Почта',
            type: 'email',
            events: {
                blur: createValidator('email'),
            },
        });

        const loginInputLabel = new Label({
            text: 'Логин',
            for: 'login',
        });

        const loginInput = new Input({
            name: 'login',
            id: 'login',
            value: '',
            placeholder: 'Логин',
            type: 'text',
            events: {
                blur: createValidator('login'),
            },
        });

        const firstNameInputLabel = new Label({
            text: 'Имя',
            for: 'first_name',
        });

        const firstNameInput = new Input({
            name: 'first_name',
            id: 'first_name',
            placeholder: 'Имя',
            value: '',
            type: 'text',
            events: {
                blur: createValidator('first_name'),
            },
        });

        const lastNameInputLabel = new Label({
            text: 'Фамилия',
            for: 'second_name',
        });

        const lastNameInput = new Input({
            name: 'second_name',
            id: 'second_name',
            value: '',
            placeholder: 'Фамилия',
            type: 'text',
            events: {
                blur: createValidator('second_name'),
            },
        });

        const displayNameInputLabel = new Label({
            text: 'Имя в чате',
            for: 'display_name',
        });

        const displayNameInput = new Input({
            name: 'display_name',
            id: 'display_name',
            value: '',
            placeholder: 'Имя в чате',
            type: 'text',
        });

        const phoneInputLabel = new Label({
            text: 'Телефон',
            for: 'phone',
        });

        const phoneInput = new Input({
            name: 'phone',
            id: 'phone',
            value: '',
            placeholder: 'Телефон',
            type: 'tel',
            events: {
                blur: createValidator('phone'),
            },
        });

        const submitButton = new Button({
            text: 'Сохранить',
            type: 'submit',
            events: {
                click: async (e: Event) => {
                    e.preventDefault();

                    const emailEl = document.getElementById(
                        'email',
                    ) as HTMLInputElement;
                    const loginEl = document.getElementById(
                        'login',
                    ) as HTMLInputElement;
                    const firstNameEl = document.getElementById(
                        'first_name',
                    ) as HTMLInputElement;
                    const secondNameEl = document.getElementById(
                        'second_name',
                    ) as HTMLInputElement;
                    const displayNameEl = document.getElementById(
                        'display_name',
                    ) as HTMLInputElement;
                    const phoneEl = document.getElementById(
                        'phone',
                    ) as HTMLInputElement;

                    const fields = [
                        { key: 'email' as const, el: emailEl },
                        { key: 'login' as const, el: loginEl },
                        { key: 'first_name' as const, el: firstNameEl },
                        { key: 'second_name' as const, el: secondNameEl },
                        { key: 'phone' as const, el: phoneEl },
                    ];

                    type ValidatableFieldKey =
                        | 'email'
                        | 'login'
                        | 'first_name'
                        | 'second_name'
                        | 'phone';

                    const validators: Record<
                        ValidatableFieldKey,
                        (event: Event) => void
                    > = {
                        email: createValidator('email'),
                        login: createValidator('login'),
                        first_name: createValidator('first_name'),
                        second_name: createValidator('second_name'),
                        phone: createValidator('phone'),
                    };

                    let hasErrors = false;
                    fields.forEach(({ key, el }) => {
                        const event = new Event('blur');
                        Object.defineProperty(event, 'target', { value: el });
                        validators[key](event);

                        if (el.classList.contains('invalid')) {
                            hasErrors = true;
                        }
                    });

                    if (hasErrors) {
                        console.log('❌ Форма содержит ошибки');
                        return;
                    }

                    console.log('✅ Форма валидна!');
                    const data: FormData = {
                        email: emailEl.value,
                        login: loginEl.value,
                        first_name: firstNameEl.value,
                        second_name: secondNameEl.value,
                        display_name: displayNameEl.value,
                        phone: phoneEl.value,
                    };

                    try {
                        const changeData = new UsersAPI();
                        await changeData.updateProfile(data);
                        console.log('✅ Данные успешно обновлены');
                        const router = new Router();
                        router.go('/settings');
                    } catch (error) {
                        console.error(
                            '❌ Ошибка при обновлении данных:',
                            error,
                        );
                    }
                },
            },
            attr: { class: 'btn btn-primary btn-save' },
        });

        const props: ChangeDataProps = {
            userData: undefined,
            isLoading: true,
            avatar,
            loginInputLabel,
            firstNameInputLabel,
            lastNameInputLabel,
            phoneInputLabel,
            displayNameInputLabel,
            displayNameInput,
            emailInputLabel,
            emailInput,
            loginInput,
            firstNameInput,
            lastNameInput,
            phoneInput,
            submitButton,
            backArrowLink,
            changeAvatar,
        };

        super(props);

        // Подписка на события будет обработана в _componentDidUpdate
    }

    protected componentDidUpdate(
        oldProps: ChangeDataProps,
        newProps: ChangeDataProps,
    ): boolean {
        if (newProps.userData && newProps.userData !== oldProps.userData) {
            this.updateInputValues(newProps.userData);
        }
        return true;
    }

    private updateInputValues(userData: UserDTO): void {
        const fieldMappings: {
            key: keyof UserDTO;
            component: keyof ChangeDataProps;
        }[] = [
            { key: 'email', component: 'emailInput' },
            { key: 'login', component: 'loginInput' },
            { key: 'first_name', component: 'firstNameInput' },
            { key: 'second_name', component: 'lastNameInput' },
            { key: 'display_name', component: 'displayNameInput' },
            { key: 'phone', component: 'phoneInput' },
        ];

        fieldMappings.forEach(({ key, component }) => {
            const childComponent = this.children[component];
            const value = userData[key];

            if (childComponent && value !== undefined && value !== null) {
                childComponent.setProps({
                    value: value.toString(),
                });
            }
        });

        if (userData.avatar && this.children.avatar) {
            this.children.avatar.setProps({
                src: userData.avatar,
            });
        }
    }

    protected render(): string {
        return `
<div class="change-data">
    {{{backArrowLink}}}
    
    <div class="flex-container-col">
        {{{changeAvatar}}}
        <form class="profile-data form-container">
            <div class="profile-row">
                {{{emailInputLabel}}}
                {{{emailInput}}}
            </div>  
            <div class="profile-row">
                {{{loginInputLabel}}}
                {{{loginInput}}}
            </div>
            <div class="profile-row">
                {{{firstNameInputLabel}}}
                {{{firstNameInput}}}
            </div>
            <div class="profile-row">
                {{{lastNameInputLabel}}}
                {{{lastNameInput}}}
            </div> 
            <div class="profile-row">
                {{{displayNameInputLabel}}}
                {{{displayNameInput}}}
            </div>
            <div class="profile-row">
                {{{phoneInputLabel}}}
                {{{phoneInput}}}
            </div>
            {{{submitButton}}}
        </form>
    </div>
</div>
        `;
    }
}
