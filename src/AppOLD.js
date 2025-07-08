import Handlebars from 'handlebars';
import { ErrorPage500 } from './pages/error500/index.js';
import { ErrorPage404 } from './pages/error404/index.js';

import { LoginPage } from './pages/login/index.js';
import { RegistrationPage } from './pages/registration/index.js';
import { ProfilePage } from './pages/profile/index.js';
import { FooterProfile } from './components/Footer/Profile/index.ts';
import { ChangePasswordPage } from './pages/changePassword/index.js';
import { ProfileRow } from './components/Profile/profile-row/index.ts';
import { ChangeDataPage } from './pages/changeData/index.js';
import { mockProfile, mockUsers } from './constants/index.ts';
import { MainContent } from './pages/chat/components/content/index.ts';
import { Nav } from './components/Nav/index.ts';
import { ChangeAvatar } from 'src/pages/changeAvatar/index.js';

export default class AppOLD {
    constructor() {
        this.state = {
            currentPage: 'MainContent',
            errorPage500: 'ErrorPage500',
            errorPage404: 'ErrorPage404',
            loginPage: 'LoginPage',
            registrationPage: 'RegistrationPage',
            profilePage: 'ProfilePage',
            footerProfile: 'FooterProfile',
            changePasswordPage: 'ChangePasswordPage',
            profileRow: 'ProfileRow',
            changeDataPage: 'ChangeDataPage',
            changeAvatar: 'ChangeAvatar',
            mainPage: 'MainContent',
        };
        this.appElement = document.getElementById('app');
    }
    renderPage(pageName) {
        const pageTemplates = {
            MainContent,
            LoginPage,
            RegistrationPage,
            ProfilePage,
            ChangePasswordPage,
            ChangeDataPage,
            ChangeAvatar,
            ErrorPage404,
            ErrorPage500,
        };

        const templateSource = pageTemplates[pageName];
        if (!templateSource) {
            console.warn(`Шаблон ${pageName} не найден`);
            return;
        }

        const template = Handlebars.compile(templateSource);
        const context = {
            profileData: mockProfile,
            chatData: mockUsers,
        };
        this.appElement.innerHTML = template(context);
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
        template = Handlebars.compile(Nav);
        this.appElement.innerHTML = template();
    }
}

document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-page]');
    if (link) {
        e.preventDefault();
        const page = link.dataset.page;
        const appInstance = new AppOLD();
        appInstance.renderPage(page);
    }
});
const appInstance = new AppOLD();
appInstance.renderPage('MainContent');
