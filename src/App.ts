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
import { AuthService } from './utils/AuthService';

export default class App {
    constructor() {
        this.init();
    }

    private async init(): Promise<void> {
        // Инициализируем проверку авторизации
        await AuthService.checkAuth();

        const router = new Router('#app');

        router
            // Публичные роуты (только для неавторизованных)
            .use('/', Login, { redirectIfAuth: true })
            .use('/sign-up', Registration, { redirectIfAuth: true })

            // Защищенные роуты (требуют авторизации)
            .use('/settings', Profile, { requiresAuth: true })
            .use('/change-avatar', ChangeAvatar, { requiresAuth: true })
            .use('/change-data', ChangeData, { requiresAuth: true })
            .use('/change-password', ChangePassword, { requiresAuth: true })
            .use('/messenger', Chat, { requiresAuth: true })
            .use('/chats/:tokenValue/:chatId', Chat, { requiresAuth: true })

            // Публичные ошибки
            .use('/500', Error500)
            .use('/404', Error404);

        router.start();
    }
}
