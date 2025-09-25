import { HTTP } from '../utils/HTTP';
import { BaseAPI } from '../utils/BaseApi';
import { UserDTO } from './auth';
import { CONFIG } from '../config';
const http = new HTTP();

export type PasswordChange = { oldPassword: string; newPassword: string };
export type AddUserToChat = { login: string };

export class UsersAPI extends BaseAPI {
    public updateProfile(data: Record<string, unknown>) {
        return http.put<Record<string, unknown>, Record<string, unknown>>(
            `${CONFIG.API_BASE_URL}/user/profile`,
            data,
        );
    }

    public updateAvatar(data: FormData) {
        return http.put<Record<string, unknown>, Record<string, unknown>>(
            `${CONFIG.API_BASE_URL}/user/profile/avatar`,
            data as unknown as Record<string, unknown>,
        );
    }

    public updatePassword(data: PasswordChange) {
        return http.put<PasswordChange, string>(
            `${CONFIG.API_BASE_URL}/user/password`,
            data,
        );
    }

    public search(data: AddUserToChat) {
        return http.post<AddUserToChat, UserDTO[]>(
            `${CONFIG.API_BASE_URL}/user/search`,
            data,
        );
    }
    public resources(path: string) {
        return http.get<string>(`${CONFIG.API_BASE_URL}/resources/${path}`);
    }
}
