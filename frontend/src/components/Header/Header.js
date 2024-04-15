import { useState } from 'react';

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

    function changeLanguage() {
        if (language === '中') setLanguage('EN');
        else if (language === 'EN') setLanguage('中');
    }

    return (
        <HeaderWrapper>
            <HeaderTitle>isChange!</HeaderTitle>
            <HeaderSearch />
            <HeaderButtonContainer>
                <HeaderIcon src={'user'} />
                <HeaderButton onClick={() => changeLanguage()}>{language}</HeaderButton>
            </HeaderButtonContainer>
        </HeaderWrapper>
    )
}