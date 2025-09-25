import { HTTP } from '../utils/HTTP';
import { BaseAPI } from '../utils/BaseApi';
import { data } from 'autoprefixer';

const API_ROOT = 'https://ya-praktikum.tech/api/v2';
const http = new HTTP();
type UserDelete = {
    users: number[];
    chatId: number;
};
export type ChatDTO = { id: number; title: string };
export type ChatUserDTO = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string | null;
    login: string;
    avatar: string | null;
    role: 'admin' | 'regular';
};

export class ChatsAPI extends BaseAPI {
    public list() {
        return http.get<ChatDTO[]>(`${API_ROOT}/chats`);
    }

    public create(title: string) {
        return http.post<{ title: string }, { id: number }>(
            `${API_ROOT}/chats`,
            { title },
        );
    }

    public addUser(chatId: number, userId: number) {
        return http.put<Record<string, unknown>, string>(
            `${API_ROOT}/chats/users`,
            { users: [userId], chatId },
        );
    }

    public removeUser(chatId: number, userId: number) {
        return http.delete<Record<string, unknown>, string>(
            // `${API_ROOT}/chats/users?chatId=${chatId}&users=[${userId}]`,
            `${API_ROOT}/chats/users`,
            { users: [userId], chatId },
        );
    }

    public getToken(chatId: number) {
        return http.post<undefined, { token: string }>(
            `${API_ROOT}/chats/token/${chatId}`,
        );
    }

    public getUsers(chatId: number) {
        return http.get<ChatUserDTO[]>(`${API_ROOT}/chats/${chatId}/users`);
    }
}
