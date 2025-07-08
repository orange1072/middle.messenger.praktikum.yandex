import { Block } from '../../framework/Block';
import { Link } from '../../components/link';
import { mockProfile } from '../../constants';
import { Avatar } from '../../components/avatar';

export class Profile extends Block {
    constructor() {
        const profileAvatar = new Avatar({
            src: 'avatar',
            attr: { class: 'profile-avatar' },
        });

        const changeDataLink = new Link({
            text: 'Изменить данные',
            dataPage: 'ChangeDataPage',
            href: '#',
            attr: { class: 'change-data' },
        });

        const changePasswordLink = new Link({
            text: 'Изменить пароль',
            dataPage: 'ChangePasswordPage',
            href: '#',
            attr: { class: 'change-password' },
        });
        const exitLink = new Link({
            text: 'Выйти',
            dataPage: 'MainContent',
            href: '#',
            attr: { class: 'exit-link-red' },
        });

        super({
            profileAvatar,
            changeDataLink,
            changePasswordLink,
            exitLink,
        });
    }
    protected render(): string {
        return `
<div>
{{{profileAvatar}}}

        <div class="profile-data">
        ${mockProfile
            .map(
                (item) => `
        <div class="profile-row">
            <span>${item.description}</span>
            <span class="profile-row-data-text-grey">${item.data}</span>
       
        </div>`,
            )
            .join('')}
         </div>
         <div class="footer">
         <div class="border-bottom-line">
          {{{changeDataLink}}}
        </div>
        <div class="border-bottom-line"> {{{changePasswordLink}}}</div>
       <div> {{{exitLink}}}</div>
       
        </div>
      
         </div>
         
    `;
    }
}
