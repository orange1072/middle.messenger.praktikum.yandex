import { Error500 } from './pages/error500';
import { Error404 } from './pages/error404';
import { ChangeAvatar } from './pages/changeAvatar';
import { ChangeData } from './pages/changeData';
import { Login } from './pages/login';
import { Registration } from './pages/registration';
import { Profile } from './pages/profile';
import { ChangePassword } from './pages/changePassword';
import { Chat } from './pages/chat';
import { Nav } from './components/Nav';
import { initFieldValidation } from './utils/validationRules';

export default class App {
    private appElement: HTMLElement | null;
    currentPage: Nav;
    state: string = 'Nav';

    constructor() {
        this.appElement = document.getElementById('app');
        this.currentPage = new Nav();
    }

    render(): void {
        if (!this.appElement) {
            return;
        }
        this.appElement.innerHTML = '';
        switch (this.state) {
            case 'Error404':
                this.appElement.appendChild(new Error404().getContent());
                break;
            case 'Error500':
                this.appElement.appendChild(new Error500().getContent());
                break;
            case 'Login':
                this.appElement.appendChild(new Login().getContent());
                break;
            case 'Registration':
                this.appElement.appendChild(new Registration().getContent());
                break;
            case 'Profile':
                this.appElement.appendChild(new Profile().getContent());
                break;
            case 'ChangeAvatar':
                this.appElement.appendChild(new ChangeAvatar().getContent());
                break;
            case 'ChangePassword':
                this.appElement.appendChild(new ChangePassword().getContent());
                break;
            case 'ChangeData':
                this.appElement.appendChild(new ChangeData().getContent());
                break;
            case 'Chat':
                this.appElement.appendChild(new Chat().getContent());
                break;
            default:
                this.appElement.appendChild(new Nav().getContent());
        }
        this.initValidation();
    }
    initValidation() {
        const ids = [
            'login',
            'password',
            'phone',
            'second_name',
            'first_name',
            'email',
            'message',
            'oldPassword',
            'newPassword',
        ];

        ids.forEach((id) => initFieldValidation(id));
    }
}
const appInstance = new App();
appInstance.render();

document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    const link = target.closest('a[data-page]') as HTMLAnchorElement | null;
    if (link) {
        e.preventDefault();

        const page = link.dataset.page;
        if (page) {
            appInstance.state = page;
            appInstance.render();

            window.history.pushState({}, '', link.href);
        }
    }
});

window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    let page = 'Nav';

    switch (path) {
        case '/login':
            page = 'Login';
            break;
        case '/registration':
            page = 'Registration';
            break;
        case '/profile':
            page = 'Profile';
            break;
        case '/chat':
            page = 'Chat';
            break;
        default:
            page = 'Nav';
            break;
    }

    appInstance.state = page;
    appInstance.render();
});
