import { Block } from '../../framework/Block';
import { Link } from '../../components/link';
import { Avatar } from '../../components/avatar';
import { Router } from '../../framework/Router';
import { AuthAPI, UserDTO } from '../../api/auth';

export class Profile extends Block {
    constructor() {
        const router = new Router();
        const profileAvatar = new Avatar({
            src: 'avatar',
            attr: { class: 'profile-avatar' },
        });
        const backArrowLink = new Link({
            text: '',
            hasIcon: true,
            attr: { class: 'back-arrow' },
            href: '',
            events: {
                click: (e) => {
                    e.preventDefault();
                    router.back();
                },
            },
            src: '/static/sendMessage.png',
            iconClass: 'back-arrow-link',
            iconStyle: 'width: 40px; height: 40px;',
        });
        const changeDataLink = new Link({
            text: 'Изменить данные',
            dataPage: 'ChangeDataPage',
            href: '/change-data',
            attr: { class: 'change-data' },
        });

        const changePasswordLink = new Link({
            text: 'Изменить пароль',
            dataPage: 'ChangePasswordPage',
            href: '/change-password',
            attr: { class: 'change-password' },
        });

        const exitLink = new Link({
            text: 'Выйти',
            href: '#',
            events: {
                click: async (e: Event) => {
                    e.preventDefault();
                    const logout = new AuthAPI().logout();
                    await logout;
                    router.go('/');
                },
            },
            attr: { class: 'exit-link-red' },
        });

        super({
            profileAvatar,
            changeDataLink,
            changePasswordLink,
            exitLink,
            backArrowLink,
            userData: null,
            isLoading: true,
        });
    }
    componentDidMount() {
        this.fetchUserData();
    }
    private async fetchUserData() {
        try {
            const authAPI = new AuthAPI();
            const userData = await authAPI.getUser();

            this.children.profileAvatar.setProps({
                src: userData.avatar || '',
            });

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
    protected render(): string {
        const { userData, isLoading } = this.props;

        if (isLoading) {
            return `<div>Загрузка...</div>`;
        }

        const profileFields = [
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


{{{profileAvatar}}}

        <div class="profile-data">
        ${profileFields
            .map(
                (item) => `
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
        <div class="border-bottom-line"> {{{changePasswordLink}}}</div>
       <div> {{{exitLink}}}</div>
               </div>
            </div>
</div>

        
    `;
    }
}
