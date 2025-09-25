import { HTTP } from '../utils/HTTP';
import { BaseAPI } from '../utils/BaseApi';
import { UserDTO } from './auth';
import { data } from 'autoprefixer';

const API_ROOT = 'https://ya-praktikum.tech/api/v2';
const http = new HTTP();

export type PasswordChange = { oldPassword: string; newPassword: string };
export type AddUserToChat = { login: string };

export class UsersAPI extends BaseAPI {
    public updateProfile(data: Record<string, unknown>) {
        return http.put<Record<string, unknown>, Record<string, unknown>>(
            `${API_ROOT}/user/profile`,
            data,
        );
    }

    public updateAvatar(data: FormData) {
        return http.put<FormData, Record<string, unknown>>(
            `${API_ROOT}/user/profile/avatar`,
            data,
        );
    }

    public updatePassword(data: PasswordChange) {
        return http.put<PasswordChange, string>(
            `${API_ROOT}/user/password`,
            data,
        );
    }

    public search(data: AddUserToChat) {
        return http.post<AddUserToChat, UserDTO[]>(
            `${API_ROOT}/user/search`,
            data,
        );
    }
    public resources(path: string) {
        return http.get<string>(`${API_ROOT}/resources/${path}`);
    }
}
