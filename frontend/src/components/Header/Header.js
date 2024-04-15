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

    return (
        <HeaderWrapper>
            <HeaderTitle onClick={() => navigate('/')}>isChange!</HeaderTitle>
            <HeaderSearch />
            <HeaderButtonContainer>
                <HeaderIcon src={'user'} onClick={() => navigate('/edit')} />
                <HeaderButton onClick={() => changeLanguage()}>{language}</HeaderButton>
            </HeaderButtonContainer>
        </HeaderWrapper>
    )
}