import { Block } from '../../framework/Block';
import { Link } from '../../components/link';
import { Avatar } from '../../components/avatar';
import { Router } from '../../framework/Router';
import { AuthAPI, UserDTO } from '../../api/auth';
import { AuthService } from '../../utils/AuthService';
import { CONFIG } from '../../config';

// Интерфейс для полей профиля
interface ProfileField {
    description: string;
    data: string;
}

// Интерфейс для свойств компонента Profile
type ProfileProps = {
    profileAvatar: Avatar;
    changeDataLink: Link;
    changePasswordLink: Link;
    exitLink: Link;
    backArrowLink: Link;
    userData: UserDTO | null;
    isLoading: boolean;
    avatarUrl: string;
};

export class Profile extends Block<ProfileProps> {
    constructor() {
        const router: Router = new Router();

        const profileAvatar: Avatar = new Avatar({
            src: '',
            alt: 'Avatar',
            attr: { class: 'profile-avatar' },
        });

        const backArrowLink: Link = new Link({
            text: '',
            hasIcon: true,
            attr: { class: 'back-arrow' },
            href: '',
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    router.back();
                },
            },
            src: `${CONFIG.STATIC_BASE_URL}/sendMessage.png`,
            iconClass: 'back-arrow-link',
            iconStyle: 'width: 30px; height: 30px;',
        });

        const changeDataLink: Link = new Link({
            text: 'Изменить данные',
            dataPage: 'ChangeDataPage',
            href: '/change-data',
            attr: { class: 'change-data' },
        });

        const changePasswordLink: Link = new Link({
            text: 'Изменить пароль',
            dataPage: 'ChangePasswordPage',
            href: '/change-password',
            attr: { class: 'change-password' },
        });

        const exitLink: Link = new Link({
            text: 'Выйти',
            href: '#',
            events: {
                click: async (e: Event) => {
                    e.preventDefault();

                    await AuthService.logout();
                    const refresh: Router = new Router();
                    await refresh.updateAuthStatus();
                    router.go('/');
                },
            },
            attr: { class: 'exit-link-red' },
        });

        const initialProps: ProfileProps = {
            profileAvatar,
            changeDataLink,
            changePasswordLink,
            exitLink,
            backArrowLink,
            userData: null,
            isLoading: true,
            avatarUrl: '',
        };

        super(initialProps);
    }

    public componentDidMount(): void {
        this.fetchUserData();
    }

    private async fetchUserData(): Promise<void> {
        try {
            const authAPI: AuthAPI = new AuthAPI();
            const userData: UserDTO = await authAPI.getUser();

            let avatarUrl: string = '';
            if (userData.avatar) {
                // Формируем полный URL к аватару
                avatarUrl = `https://ya-praktikum.tech/api/v2/resources${userData.avatar}`;
                console.log('Avatar URL:', avatarUrl);
            }

            // Обновляем компонент аватара
            this.children.profileAvatar.setProps({
                src: avatarUrl,
            });

            this.setProps({
                userData,
                isLoading: false,
                avatarUrl: avatarUrl,
            });
        } catch (error: unknown) {
            console.error('Ошибка:', error);
            this.setProps({
                isLoading: false,
            });
        }
    }

    protected render(): string {
        const { userData, isLoading, avatarUrl }: ProfileProps = this.props;

        if (isLoading) {
            return `<div>Загрузка...</div>`;
        }

        if (!userData) {
            return `<div>Ошибка загрузки данных</div>`;
        }

        const profileFields: ProfileField[] = [
            { description: 'Имя', data: userData.first_name },
            { description: 'Фамилия', data: userData.second_name },
            {
                description: 'Отображаемое имя',
                data: userData.display_name || '-',
            },
            { description: 'Логин', data: userData.login },
            { description: 'Email', data: userData.email },
            { description: 'Телефон', data: userData.phone },
        ];

        return `
<div class="flex-container-row">
    {{{backArrowLink}}}
    <div class="profile-page">
        ${
            avatarUrl
                ? `
            <div class="profile-avatar-container">
                <img src="${avatarUrl}" alt="Avatar" class="profile-avatar-img">
            </div>
        `
                : `
            <div class="profile-avatar-container">
                {{{profileAvatar}}}
            </div>
        `
        }
        
        <div class="profile-data">
            ${profileFields
                .map(
                    (item: ProfileField) => `
            <div class="profile-row">
                <span>${item.description}</span>
                <span class="profile-row-data-text-grey">${item.data}</span>
            </div>`,
                )
                .join('')}
        </div>
        
        <div class="footer">
            <div class="border-bottom-line">
                {{{changeDataLink}}}
            </div>
            <div class="border-bottom-line">
                {{{changePasswordLink}}}
            </div>
            <div>
                {{{exitLink}}}
            </div>
        </div>
    </div>
</div>`;
    }
}
