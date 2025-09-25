import { Block } from './Block';
import { Route } from './Route';
import { AuthService } from '../utils/AuthService';

// Базовый интерфейс для пропсов Block
interface BlockProps {
    [key: string]: unknown;
}

// Обобщенный тип для конструктора Block
type BlockConstructor<P extends BlockProps = BlockProps> = new (
    propsAndChildren?: P,
) => Block<P>;

type RouteConfig = {
    requiresAuth?: boolean;
    redirectIfAuth?: boolean;
};


export class Router {
    static __instance: Router;

    private routes: Route[] = [];
    private history: History = window.history;
    private _currentRoute: Route | null = null;
    private _rootQuery: string = '';

    constructor(rootQuery = '#app') {
        if (Router.__instance) {
            return Router.__instance;
        }

        this._rootQuery = rootQuery;
        Router.__instance = this;
    }

    use<P extends BlockProps>(
        pathname: string,
        block: BlockConstructor<P>,
        config: RouteConfig = {},
    ): Router {
        const route = new Route(
            pathname,
            block as new (propsAndChildren?: unknown) => Block<never>,
            {
                rootQuery: this._rootQuery,
            } as Record<string, unknown>,
            config,
        );
        this.routes.push(route);
        return this;
    }

    start(): void {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    public updateAuthStatus(): void {
        const currentPath = window.location.pathname;
        this._onRoute(currentPath);
    }

    private _onRoute(pathname: string): void {
        const route = this.getRoute(pathname);
        console.log('Переход на:', pathname);

        if (!route) {
            console.log('Роут не найден, редирект на 404');
            this.go('/404');
            return;
        }

        if (!this._canActivate(route)) {
            console.log('Доступ запрещен для роута:', pathname);
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.navigate(pathname);
        console.log('Роут успешно активирован:', pathname);
    }

    private _canActivate(route: Route): boolean {
        if (!route.canActivate()) {
            const config = route.getConfig();

            if (config.requiresAuth && !AuthService.isAuthenticated()) {
                this.go('/');
                return false;
            }

            if (config.redirectIfAuth && AuthService.isAuthenticated()) {
                this.go('/messenger');
                return false;
            }

            this.go('/404');
            return false;
        }

        return true;
    }

    go(pathname: string): void {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    getRoute(pathname: string): Route | null {
        return this.routes.find((route) => route.match(pathname)) || null;
    }

    getCurrentParams(): Record<string, string> {
        return this._currentRoute?.getParams() || {};
    }

    back(): void {
        this.history.back();
    }

    forward(): void {
        this.history.forward();
    }
}
