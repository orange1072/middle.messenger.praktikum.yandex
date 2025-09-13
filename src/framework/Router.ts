import { Block } from './Block';
import { Route } from './Route';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BlockConstructor = new (propsAndChildren?: any) => Block<any>;

export class Router {
    static __instance: Router;

    private routes: Route[] = [];
    private history: History = window.history;
    private _currentRoute: Route | null = null;
    private _rootQuery!: string;

    constructor(rootQuery = '#app') {
        if (Router.__instance) {
            return Router.__instance;
        }

        this._rootQuery = rootQuery;
        Router.__instance = this;
    }

    use(pathname: string, block: BlockConstructor): Router {
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery,
        });
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            this.go('/404'); // fallback
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    getRoute(pathname: string): Route | null {
        return this.routes.find((route) => route.match(pathname)) || null;
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }
}
