import { HTTP } from '../utils/HTTP';
import { BaseAPI } from '../utils/BaseApi';

const API_ROOT = 'https://ya-praktikum.tech/api/v2';
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
            `${API_ROOT}/auth/signup`,
            data,
        );
    }

    public signin(data: SigninRequest) {
        return http.post<SigninRequest, string>(
            `${API_ROOT}/auth/signin`,
            data,
        );
    }

    public getUser() {
        return http.get<UserDTO>(`${API_ROOT}/auth/user`);
    }

    public logout() {
        return http.post(`${API_ROOT}/auth/logout`);
    }
}
