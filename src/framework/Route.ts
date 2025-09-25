import { Nullable } from '../types';
import { Block } from './Block';
import { render } from '../utils';
import { AuthService } from '../utils/AuthService';

type BlockConstructor = new (propsAndChildren?: unknown) => Block<never>;

type RouteConfig = {
    requiresAuth?: boolean;
    redirectIfAuth?: boolean;
};
export class Route {
    private _pathname: string;
    private _blockClass: BlockConstructor;
    private _block: Nullable<Block> = null;
    private _props: Record<string, unknown>;
    private _pattern: RegExp;
    private _params: Record<string, string> = {};
    private _config: RouteConfig;

    constructor(
        pathname: string,
        view: BlockConstructor,
        props: Record<string, unknown>,
        config: RouteConfig = {},
    ) {
        this._pathname = pathname;
        this._blockClass = view;
        this._props = props;
        this._config = config;
        this._pattern = this._createPattern(pathname);
    }

    canActivate(): boolean {
        const isAuthenticated = AuthService.isAuthenticated();

        // Если роут требует авторизации, но пользователь не авторизован
        if (this._config.requiresAuth && !isAuthenticated) {
            return false;
        }

        // Если роут должен быть доступен только для неавторизованных
        if (this._config.redirectIfAuth && isAuthenticated) {
            return false;
        }

        return true;
    }

    getConfig(): RouteConfig {
        return this._config;
    }

    private _createPattern(pathname: string): RegExp {
        // Заменяем :paramName на regex группы
        const pattern = pathname
            .replace(/\//g, '\\/')
            .replace(/:(\w+)/g, '([^\\/]+)');

        return new RegExp(`^${pattern}$`);
    }
    private _extractParams(pathname: string): Record<string, string> {
        const match = pathname.match(this._pattern);
        if (!match) return {};

        const params: Record<string, string> = {};
        const paramNames = this._pathname.match(/:(\w+)/g) || [];

        paramNames.forEach((param, index) => {
            const paramName = param.slice(1); // Убираем двоеточие
            params[paramName] = match[index + 1];
        });

        return params;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this._params = this._extractParams(pathname);
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return this._pattern.test(pathname);
    }

    getParams(): Record<string, string> {
        return this._params;
    }

    render() {
        if (!this._block) {
            // Передаем параметры в компонент
            this._block = new this._blockClass({ params: this._params });
            render(this._props.rootQuery as string, this._block);
        } else {
            // Обновляем параметры при повторном рендере
            this._block.setProps({ params: this._params });
            this._block.show();
        }
    }
}
