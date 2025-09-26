import { BaseAPI } from '../../../utils/BaseApi';
import { HTTP } from '../../../utils/HTTP';


type SignInRequest = {
    login: string;
    password: string;
};
type SignInResponse = {
     id: string;
};
const authAPIInstance = new HTTP();
const url = 'https://ya-praktikum.tech/api/v2/auth/signin';


export class SignInAPI extends BaseAPI {
    public request(user: SignInRequest) {
        return authAPIInstance
            .post<SignInRequest, SignInResponse>(`${url}`, user)
            .then(({  id }) => id); // Обрабатываем получение данных из сервиса далее
    }
}
