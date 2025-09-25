import { HTTP } from '../utils/HTTP';
import { BaseAPI } from '../utils/BaseApi';
import { CONFIG } from '../config';
const http = new HTTP();

export type SigninRequest = {
    login: string;
    password: string;
};

export type SignupRequest = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

export type UserDTO = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string | null;
    login: string;
    email: string;
    phone: string;
    avatar: string | null;
};

export class AuthAPI extends BaseAPI {
    public signup(data: SignupRequest) {
        return http.post<SignupRequest, { id: number }>(
            `${CONFIG.API_BASE_URL}/auth/signup`,
            data,
        );
    }

    public signin(data: SigninRequest) {
        return http.post<SigninRequest, string>(
            `${CONFIG.API_BASE_URL}/auth/signin`,
            data,
        );
    }

    public getUser() {
        return http.get<UserDTO>(`${CONFIG.API_BASE_URL}/auth/user`);
    }

    public logout() {
        return http.post(`${CONFIG.API_BASE_URL}/auth/logout`);
    }
}
