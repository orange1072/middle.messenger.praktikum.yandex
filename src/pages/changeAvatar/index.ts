import { Block } from '../../framework/Block';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { UsersAPI } from '../../api/users';
import { Router } from '../../framework/Router';

export class ChangeAvatar extends Block {
    constructor() {
        const { updateAvatar } = new UsersAPI();
        const router = new Router();
        const inputAvatarChange = new Input({
            name: 'avatar',
            id: 'avatar',
            type: 'file',
            attr: { class: 'change-avatar-input' },
        });

        const buttonAvatarChange = new Button({
            text: 'Поменять',
            type: 'submit',
            attr: { class: 'btn btn-primary btn-save change-avatar-btn' },
            events: {
                click: async (e: Event) => {
                    e.preventDefault();

                    // Получаем элемент input по ID
                    const avatarInput = document.getElementById(
                        'avatar',
                    ) as HTMLInputElement;

                    // Проверяем, что файл выбран
                    if (
                        avatarInput &&
                        avatarInput.files &&
                        avatarInput.files.length > 0
                    ) {
                        const file = avatarInput.files[0];

                        // Создаем FormData для отправки файла
                        const formData = new FormData();
                        formData.append('avatar', file);

                        try {
                            // Отправляем FormData в API
                            await updateAvatar(formData);
                            console.log('Аватар успешно обновлен!');
                            router.go('/settings');
                        } catch (error) {
                            console.error(
                                'Ошибка при обновлении аватара:',
                                error,
                            );
                        }
                    } else {
                        console.log('Файл не выбран');
                    }
                },
            },
        });

        super({
            inputAvatarChange,
            buttonAvatarChange,
        });
    }

    protected render(): string {
        return `
       <div class="change-avatar">
    <h3>Загрузите файл</h3>
    <form action="">
        {{{inputAvatarChange}}}
        {{{buttonAvatarChange}}}
    </form>
</div>
              `;
    }
}
