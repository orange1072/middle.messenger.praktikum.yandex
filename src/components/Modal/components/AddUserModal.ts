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

type AddUserModalProps = {
    textBlock: Text;
    inputUserLogin: Input;
    submitButton: Button;
    currentChatId: number;
};

export class AddUserModal extends Block<AddUserModalProps> {
    private chatsAPI: ChatsAPI;
    private usersAPI: UsersAPI;
    private currentChatId: number;

    constructor() {
        const chatsAPI = new ChatsAPI();
        const usersAPI = new UsersAPI();

        // Получаем текущий чат из store
        const currentChat: Chat | undefined = store.getCurrentChat();
        const currentChatId = currentChat?.id ? Number(currentChat.id) : 0;

        const textBlock = new Text({
            text: 'Добавить пользователя',
        });

        const inputUserLogin = new Input({
            name: 'userLogin',
            id: 'inputUserLogin',
            placeholder: 'Введите логин пользователя',
            attr: { class: 'input-under-line' },
        });

        const submitButton = new Button({
            text: 'Добавить',
            attr: { class: 'btn btn-primary' },
            events: {
                click: async (e: Event) => {
                    e.preventDefault();
                    const inputElement = document.getElementById(
                        'inputUserLogin',
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

                        await this.chatsAPI.addUser(this.currentChatId, userId);
                        alert('Пользователь успешно добавлен в чат');
                    } catch (error) {
                        console.error(
                            'Ошибка при добавлении пользователя:',
                            error,
                        );
                        alert('Ошибка при добавлении пользователя');
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
<div id="userAddModal" class="modal-form">
   {{{textBlock}}}
   {{{inputUserLogin}}}
   {{{submitButton}}}
</div>
    `;
    }
}
