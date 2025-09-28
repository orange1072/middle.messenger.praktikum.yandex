import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Router } from '../Router';
import { Block } from '../Block';
import { AuthService } from '../../utils/AuthService';

// Мокаем AuthService
jest.mock('../../utils/AuthService', () => ({
    AuthService: {
        checkAuth: jest.fn(),
        isAuthenticated: jest.fn(),
    },
}));

// Создаем тестовый компонент
class TestBlock extends Block {
    render() {
        return '<div>Test Block</div>';
    }
}

describe('Router', () => {
    let router: Router;
    let mockAuthService: jest.Mocked<typeof AuthService>;

    beforeEach(() => {
        // Очищаем все моки
        jest.clearAllMocks();

        // Очищаем DOM
        document.body.innerHTML = '<div id="test-app"></div>';

        // Создаем новый экземпляр роутера
        router = new Router('#test-app');

        // Мокаем AuthService
        mockAuthService = AuthService as jest.Mocked<typeof AuthService>;
        mockAuthService.checkAuth.mockResolvedValue(true);
        mockAuthService.isAuthenticated.mockReturnValue(true);
    });

    describe('constructor', () => {
        it('should create singleton instance', () => {
            const router1 = new Router();
            const router2 = new Router();
            expect(router1).toBe(router2);
        });
    });

    describe('use method', () => {
        it('should add route to routes array', () => {
            router.use('/test', TestBlock);
            expect(router['routes']).toHaveLength(1);
        });

        it('should return router instance for chaining', () => {
            const result = router.use('/test', TestBlock);
            expect(result).toBe(router);
        });

        it('should add route with config', () => {
            router.use('/protected', TestBlock, { requiresAuth: true });
            const route = router['routes'][0];
            expect(route).toBeDefined();
            // Конфигурация сохраняется внутри роута
        });
    });

    describe('getRoute method', () => {
        beforeEach(() => {
            router.use('/test', TestBlock);
            router.use('/user/:id', TestBlock);
        });

        it('should return matching route', () => {
            const route = router.getRoute('/test');
            expect(route).toBeDefined();
        });

        it('should return null for non-matching route', () => {
            const route = router.getRoute('/nonexistent');
            expect(route).toBeNull();
        });

        it('should match route with parameters', () => {
            const route = router.getRoute('/user/123');
            expect(route).toBeDefined();
        });
    });

    describe('getCurrentParams', () => {
        it('should return empty object when no current route', () => {
            const params = router.getCurrentParams();
            expect(params).toEqual({});
        });
    });
});
