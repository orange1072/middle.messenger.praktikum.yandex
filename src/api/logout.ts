import { HTTP } from '../utils/HTTP';
import { BaseAPI } from '../utils/BaseApi';

const logoutAPIInstance = new HTTP();

const headers = {
    'access-control-allow-credentials': 'true',
    'access-control-allow-headers':
        'Origin,X-Requested-With,Content-Type,Accept',
    'access-control-allow-methods': 'GET,POST,PUT,OPTIONS,DELETE',
    'access-control-allow-origin': 'https://ya-praktikum.tech ',
    'content-type': 'application/json',
};

export class LogoutAPI extends BaseAPI {
    request() {
        return logoutAPIInstance.post(
            'https://ya-praktikum.tech/api/v2/auth/logout',
            { headers },
        );
    }
}
