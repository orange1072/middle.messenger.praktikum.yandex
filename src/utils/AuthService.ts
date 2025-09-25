// services/AuthService.ts
export class AuthService {
    static isAuthenticated(): boolean {
        const token = this.getToken();

        return !!token;
    }

    static getToken(): string | null {
        return (
            document.cookie
                .split('; ')
                .find((row) => row.startsWith('authToken='))
                ?.split('=')[1] || null
        );
    }

    static setToken(token: string, expiresInDays: number = 1): void {
        const date = new Date();
        date.setTime(date.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
        document.cookie = `authToken=${token}; expires=${date.toUTCString()}; path=/`;
    }

    static logout(): void {
        // Устанавливаем срок жизни куки в прошлое
        document.cookie =
            'authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

        // Дополнительные куки, если есть
        document.cookie =
            'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        document.cookie =
            'userId=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }

    // private static isTokenExpired(token: string): boolean {
    //     try {
    //         const payload = JSON.parse(atob(token.split('.')[1]));
    //         return payload.exp * 1000 < Date.now();
    //     } catch {
    //         return true;
    //     }
    // }
}
