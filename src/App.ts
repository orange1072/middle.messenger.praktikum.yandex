import { Error500 } from './pages/error500';
import { Error404 } from './pages/error404';
import { ChangeAvatar } from './pages/changeAvatar';
import { ChangeData } from './pages/changeData';
import { Login } from './pages/login';
import { Registration } from './pages/registration';
import { Profile } from './pages/profile';
import { ChangePassword } from './pages/changePassword';
import { Chat } from './pages/chat';
import { Router } from './framework/Router';

export default class App {
    constructor() {
        const router = new Router('#app');

        router
            .use('/', Login)
            .use('/sign-up', Registration)
            .use('/settings', Profile)
            .use('/change-avatar', ChangeAvatar)
            .use('/change-data', ChangeData)
            .use('/change-password', ChangePassword)
            .use('/messenger', Chat)
            .use('/500', Error500)
            .use('/404', Error404);

        router.start();
    }
}
