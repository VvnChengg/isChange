import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    HeaderWrapper,
    HeaderTitle,
    HeaderSearch,
    HeaderButtonContainer, 
    HeaderButton, 
    HeaderIcon
} from './Header-style.js';

export default function Header() {
    const [language, setLanguage] = useState('中');
    const navigate = useNavigate();

    function changeLanguage() {
        if (language === '中') setLanguage('EN');
        else if (language === 'EN') setLanguage('中');
    }

    function clickUser() {
        const token = window.localStorage.getItem('access_token');

        if (token) navigate('/edit');
        else navigate('/login');
    }

    return (
        <HeaderWrapper>
            <HeaderTitle onClick={() => navigate('/')}>isChange!</HeaderTitle>
            <HeaderSearch />
            <HeaderButtonContainer>
                <HeaderIcon src={'chat'} onClick={() => navigate('/chat-list')} />
                <HeaderIcon src={'user'} onClick={() => clickUser()} />
                <HeaderButton onClick={() => changeLanguage()}>{language}</HeaderButton>
            </HeaderButtonContainer>
        </HeaderWrapper>
    )
}