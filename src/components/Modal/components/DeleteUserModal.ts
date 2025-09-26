import { Input } from '../../input';
import { Text } from '../../text';
import { Block } from '../../../framework/Block';
import { Button } from '../../button';
import { ChatsAPI } from '../../../api/chats';
import { UsersAPI } from '../../../api/users';
import { store } from '../../../store';

// Типы для данных
type User = {
    id: number;
    login: string;
    // добавьте другие свойства пользователя по необходимости
};

type Chat = {
    id: number;
    // добавьте другие свойства чата по необходимости
};

type DeleteUserModalProps = {
    textBlock: Text;
    inputUserLogin: Input;
    submitButton: Button;
    currentChatId: number;
};
export class DeleteUserModal extends Block<DeleteUserModalProps> {
    private chatsAPI: ChatsAPI;
    private usersAPI: UsersAPI;
    private currentChatId: number;
    constructor() {
        const chatsAPI = new ChatsAPI();
        const usersAPI = new UsersAPI();

        // Получаем текущий чат из store
        const currentChat: Chat | undefined = store.getCurrentChat() as Chat | undefined;
        const currentChatId = currentChat?.id ? Number(currentChat.id) : 0;

        const textBlock = new Text({
            text: 'Удалить пользователя',
        });
        const inputUserLogin = new Input({
            name: 'userLogin',
            id: 'inputUserLoginDel',
            placeholder: 'Введите логин пользователя',
            attr: { class: 'input-under-line' },
        });

        const submitButton = new Button({
            text: 'Удалить',
            attr: { class: 'btn btn-primary' },
            events: {
                click: async (e: Event) => {
                    e.preventDefault();
                    const inputElement = document.getElementById(
                        'inputUserLoginDel',
                    ) as HTMLInputElement;
                    const login = inputElement?.value?.trim();

                    if (!login) {
                        alert('Введите логин пользователя');
                        return;
                    }

                    try {
                        const users: User[] = await this.usersAPI.search({
                            login: login,
                        });

                        if (!users || users.length === 0) {
                            alert('Пользователь с таким логином не найден');
                            return;
                        }

                        const userId = users[0].id;

                        await this.chatsAPI.removeUser(
                            this.currentChatId,
                            userId,
                        );
                        alert('Пользователь успешно удален из чата');
                    } catch (error) {
                        console.error(
                            'Ошибка при удалении пользователя:',
                            error,
                        );
                        alert('Ошибка при удалении пользователя');
                    }
                },
            },
        });

        super({
            textBlock,
            inputUserLogin,
            submitButton,
            currentChatId,
        });
        this.chatsAPI = chatsAPI;
        this.usersAPI = usersAPI;
        this.currentChatId = currentChatId;
    }
    protected render(): string {
        return `
<div id="deleteUserModal" class="modal-form">
   {{{textBlock}}}
   {{{inputUserLogin}}}
   {{{submitButton}}}
</div>
        `;
    }
}
