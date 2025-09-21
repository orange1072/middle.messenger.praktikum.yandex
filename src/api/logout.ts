import { HTTP } from '../utils/HTTP';
import { BaseAPI } from '../utils/BaseApi';
import { HEADERS } from '../constants';

const logoutAPIInstance = new HTTP();

export class LogoutAPI extends BaseAPI {
    request() {
        return logoutAPIInstance.post(
            'https://ya-praktikum.tech/api/v2/auth/logout',
            { HEADERS },
        );
    }
}
