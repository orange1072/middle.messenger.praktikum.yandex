import { AuthAPI, UserDTO } from '../api/auth';

// services/AuthService.ts
export class AuthService {
    private static _isAuthenticated: boolean = false;
    private static _user: UserDTO | null = null;

    static isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    static async checkAuth(): Promise<boolean> {
        try {
            const authAPI = new AuthAPI();
            const user = await authAPI.getUser();
            this._isAuthenticated = true;
            this._user = user;
            return true;
        } catch {
            this._isAuthenticated = false;
            this._user = null;
            return false;
        }
    }

    static getUser(): UserDTO | null {
        return this._user;
    }

    static setAuthenticated(user: UserDTO): void {
        this._isAuthenticated = true;
        this._user = user;
    }

    static async logout(): Promise<void> {
        try {
            const authAPI = new AuthAPI();
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this._isAuthenticated = false;
            this._user = null;
        }
    }

    static clearAuth(): void {
        this._isAuthenticated = false;
        this._user = null;
    }
}
