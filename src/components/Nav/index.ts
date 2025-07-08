import { Block } from '../../framework/Block';

export class Nav extends Block {
    constructor() {
        super();
    }

    protected render(): string {
        return `
        <nav class="footer">
    <ul>
        <li><a href="#" data-page="Chat">Главная</a></li>
        <li><a href="#" data-page="Login">Вход</a></li>
        <li><a href="#" data-page="Registration">Регистрация</a></li>
        <li><a href="#" data-page="Profile">Профиль</a></li>
        <li><a href="#" data-page="ChangePassword">Пароль</a></li>
        <li><a href="#" data-page="ChangeData">Изменить данные</a></li>
        <li><a href="#" data-page="ChangeAvatar">Изменить аватар</a></li>
        <li><a href="#" data-page="Error404">Ошибка 404</a></li>
        <li><a href="#" data-page="Error500">Ошибка 500</a></li>
    </ul>
</nav>

        `;
    }
}
