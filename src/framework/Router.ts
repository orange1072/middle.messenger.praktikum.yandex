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
        window.onpopstate = async () => {
            await this._onRoute(window.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    public async updateAuthStatus(): Promise<void> {
        const currentPath = window.location.pathname;
        await this._onRoute(currentPath);
    }

    private async _onRoute(pathname: string): Promise<void> {
        const route = this.getRoute(pathname);

        if (!route) {
            this.go('/404');
            return;
        }

        const canActivate = await this._canActivate(route);
        if (!canActivate) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.navigate(pathname);

        // Проверяем, что DOM обновился
        setTimeout(() => {
            const rootElement = document.querySelector(this._rootQuery);
            if (rootElement && rootElement.children.length === 0) {
                console.error('DOM не обновился после навигации!');
            } else {
                console.log('DOM успешно обновлен');
            }
        }, 100);
    }

    private async _canActivate(route: Route): Promise<boolean> {
        if (!route.canActivate()) {
            const config = route.getConfig();

            if (config.requiresAuth) {
                const isAuth = await AuthService.checkAuth();
                if (!isAuth) {
                    this.go('/');
                    return false;
                }
            }

            if (config.redirectIfAuth) {
                const isAuth = await AuthService.checkAuth();
                if (isAuth) {
                    this.go('/messenger');
                    return false;
                }
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
