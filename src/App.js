import Handlebars from 'handlebars';
import Button from '../components/Button.js';
import { ErrorPage500 } from '../pages/errorPage500/index.js';
import { ErrorPage404 } from '../pages/errorPage404/index.js';
import Link from '../components/Link.js';
import Input from '../components/Input.js';
import { LoginPage } from '../pages/loginPage/index.js';
import { RegistrationPage } from '../pages/registrationPage/index.js';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Input', Input);

export default class App {
    constructor() {
        this.state = {
            errorPage500: 'ErrorPage500',
            errorPage404: 'ErrorPage404',
            loginPage: 'LoginPage',
            registrationPage: 'RegistrationPage',
        };
        this.appElement = document.getElementById('app');
    }
    render() {
        let template;
        // template = Handlebars.compile(AuthorizationPage);
        // this.appElement.innerHTML = template({
        //     currentPage: 'AuthorizationPage!',
        // });
        template = Handlebars.compile(LoginPage);
        this.appElement.innerHTML = template(this.state.loginPage);
    }
}
