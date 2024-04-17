import { useNavigate } from 'react-router-dom';

import {
    HeaderWrapper,
    HeaderTitle,
    HeaderButtonContainer, 
    HeaderButton, 
    HeaderIcon
} from './Header-style.js';

import Icon from '../Icon';

import { Input } from 'antd';
const { Search } = Input;

export default function Header({ language, setLanguage }) {
    const navigate = useNavigate();

    function onSearch() {
        // TBD
    }

    function changeLanguage() {
        if (language === 'zh') setLanguage('en');
        else if (language === 'en') setLanguage('zh');
    }

    function clickUser() {
        const token = window.localStorage.getItem('access_token');

        if (token) navigate('/edit');
        else navigate('/login');
    }

    return (
        <HeaderWrapper>
            <HeaderTitle onClick={() => navigate('/')}>isChange!</HeaderTitle>
            <Search onSearch={onSearch} style={{ width: '30%', marginTop: '8px' }} />
            <HeaderButtonContainer>
                <HeaderIcon onClick={() => navigate('/chat-list')}>
                    <Icon.Chat />
                </HeaderIcon>
                <HeaderIcon onClick={() => clickUser()}>
                    <Icon.User />
                </HeaderIcon>
                <HeaderButton onClick={() => changeLanguage()}>{
                    language === 'zh' ? '中' : 'EN'
                }</HeaderButton>
            </HeaderButtonContainer>
        </HeaderWrapper>
    )
}

function UserIcon() {
    return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.6375 13.8875C18.863 12.9234 19.7575 11.6012 20.1965 10.105C20.6356 8.60874 20.5974 7.01287 20.0872 5.53937C19.5771 4.06587 18.6203 2.78802 17.3501 1.8836C16.0799 0.979183 14.5593 0.493164 13 0.493164C11.4407 0.493164 9.92014 0.979183 8.64991 1.8836C7.37968 2.78802 6.42293 4.06587 5.91276 5.53937C5.4026 7.01287 5.36439 8.60874 5.80345 10.105C6.24251 11.6012 7.13701 12.9234 8.3625 13.8875C6.26259 14.7288 4.43035 16.1242 3.06111 17.9249C1.69187 19.7256 0.83695 21.8642 0.587496 24.1125C0.569439 24.2767 0.583892 24.4428 0.630028 24.6014C0.676164 24.7599 0.75308 24.9078 0.856385 25.0367C1.06502 25.2969 1.36848 25.4636 1.7 25.5C2.03152 25.5365 2.36395 25.4398 2.62415 25.2311C2.88436 25.0225 3.05103 24.7191 3.0875 24.3875C3.36198 21.944 4.5271 19.6873 6.36027 18.0485C8.19344 16.4097 10.5661 15.5038 13.025 15.5038C15.4839 15.5038 17.8566 16.4097 19.6897 18.0485C21.5229 19.6873 22.688 21.944 22.9625 24.3875C22.9965 24.6947 23.143 24.9784 23.3739 25.1838C23.6047 25.3892 23.9035 25.5019 24.2125 25.5H24.35C24.6777 25.4623 24.9772 25.2967 25.1832 25.0391C25.3892 24.7815 25.4851 24.453 25.45 24.125C25.1994 21.8703 24.3398 19.7263 22.9636 17.9228C21.5873 16.1193 19.7461 14.7244 17.6375 13.8875V13.8875ZM13 13C12.0111 13 11.0444 12.7068 10.2221 12.1574C9.3999 11.608 8.75904 10.8271 8.3806 9.91345C8.00216 8.99982 7.90314 7.99449 8.09607 7.02458C8.289 6.05468 8.7652 5.16376 9.46446 4.4645C10.1637 3.76524 11.0546 3.28903 12.0245 3.09611C12.9944 2.90318 13.9998 3.0022 14.9134 3.38064C15.827 3.75907 16.6079 4.39994 17.1573 5.22218C17.7068 6.04443 18 7.01113 18 8.00003C18 9.32612 17.4732 10.5979 16.5355 11.5356C15.5978 12.4733 14.3261 13 13 13Z" fill="#ffffff"/>
        </svg>
    )
}