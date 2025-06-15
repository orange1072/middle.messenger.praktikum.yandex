import Handlebars from 'handlebars';
import Button from '../components/Button.js';
import { ErrorPage500 } from '../pages/errorPage500/index.js';
import { ErrorPage404 } from '../pages/errorPage404/index.js';
import Link from '../components/Link.js';
import Input from '../components/Input.js';
import { LoginPage } from '../pages/loginPage/index.js';
import { RegistrationPage } from '../pages/registrationPage/index.js';
import { ProfilePage } from '../pages/profilePage/index.js';
import { FooterProfile } from '../components/Footer/Profile/index.js';
import { ChangePasswordPage } from '../pages/changePasswordPage/index.js';
import { ProfileRow } from '../components/Profile/profile-row/index.js';
import Avatar from '../components/Avatar.js';
import { ChangeDataPage } from '../pages/changeData/index.js';
import { ChatItem } from '../components/Chat/chat-item/index.js';
import { Header } from '../components/Main/header/index.js';
import { mockProfile, mockUsers } from '../constants/index.js';
import { MainContent } from '../components/Main/content/index.js';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('FooterProfile', FooterProfile);
Handlebars.registerPartial('ProfileRow', ProfileRow);
Handlebars.registerPartial('Avatar', Avatar);
Handlebars.registerPartial('ChangeDataPage', ChangeDataPage);
Handlebars.registerPartial('ChatItem', ChatItem);
Handlebars.registerPartial('Header', Header);
Handlebars.registerPartial('MainContent', MainContent);

export default class App {
    constructor() {
        this.state = {
            errorPage500: 'ErrorPage500',
            errorPage404: 'ErrorPage404',
            loginPage: 'LoginPage',
            registrationPage: 'RegistrationPage',
            profilePage: 'ProfilePage',
            footerProfile: 'FooterProfile',
            changePasswordPage: 'ChangePasswordPage',
            profileRow: 'ProfileRow',
            changeDataPage: 'ChangeDataPage',
            mainPage: 'MainContent',
        };
        this.appElement = document.getElementById('app');
    }
    render() {
        let template;

        if (this.state.errorPage500 === 'ErrorPage500') {
            template = Handlebars.compile(ErrorPage500);
            this.appElement.innerHTML = template({
                errorPage500: 'ErrorPage500',
            });
        }
        if (this.state.errorPage404 === 'ErrorPage404') {
            template = Handlebars.compile(ErrorPage404);
            this.appElement.innerHTML = template({
                errorPage404: 'ErrorPage404',
            });
        }
        if (this.state.loginPage === 'LoginPage') {
            template = Handlebars.compile(LoginPage);
            this.appElement.innerHTML = template({
                loginPage: 'LoginPage',
            });
        }
        if (this.state.profilePage === 'ProfilePage') {
            template = Handlebars.compile(ProfilePage);
            this.appElement.innerHTML = template({
                profileData: mockProfile,
            });
        }
        if (this.state.registrationPage === 'RegistrationPage') {
            template = Handlebars.compile(RegistrationPage);
            this.appElement.innerHTML = template({
                registrationPage: 'RegistrationPage',
            });
        }
        if (this.state.changePasswordPage === 'ChangePasswordPage') {
            template = Handlebars.compile(ChangePasswordPage);
            this.appElement.innerHTML = template({
                changePasswordPage: 'ChangePasswordPage',
            });
        }
        if (this.state.changeDataPage === 'ChangeDataPage') {
            template = Handlebars.compile(ChangeDataPage);
            this.appElement.innerHTML = template({
                changeDataPage: 'ChangeDataPage',
            });
        }
        if (this.state.mainPage === 'MainContent') {
            template = Handlebars.compile(MainContent);
            this.appElement.innerHTML = template({
                chatData: mockUsers,
            });
        }
        // template = Handlebars.compile(MainContent);
        //
        // // this.appElement.innerHTML = template({
        // //     profileData: mockProfile,
        // // });
        // this.appElement.innerHTML = template({
        //     chatData: mockUsers,
        // });
        // this.appElement.innerHTML = template({
        //     chatData: mockUsers,
        // });
    }
}
