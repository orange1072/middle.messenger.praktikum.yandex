import { HTTP } from '../utils/HTTP';
import { BaseAPI } from '../utils/BaseApi';
import { CONFIG } from '../config';
const http = new HTTP();
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
        return http.get<ChatDTO[]>(`${CONFIG.API_BASE_URL}/chats`);
    }

    public create(title: string) {
        return http.post<{ title: string }, { id: number }>(
            `${CONFIG.API_BASE_URL}/chats`,
            { title },
        );
    }

    public addUser(chatId: number, userId: number) {
        return http.put<Record<string, unknown>, string>(
            `${CONFIG.API_BASE_URL}/chats/users`,
            { users: [userId], chatId },
        );
    }

    public removeUser(chatId: number, userId: number) {
        return http.delete<Record<string, unknown>, string>(
            `${CONFIG.API_BASE_URL}/chats/users`,
            { users: [userId], chatId },
        );
    }

    public getToken(chatId: number) {
        return http.post<Record<string, never>, { token: string }>(
            `${CONFIG.API_BASE_URL}/chats/token/${chatId}`,
            {},
        );
    }

    public getUsers(chatId: number) {
        return http.get<ChatUserDTO[]>(`${CONFIG.API_BASE_URL}/chats/${chatId}/users`);
    }
}
