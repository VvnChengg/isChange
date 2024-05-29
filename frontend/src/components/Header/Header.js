import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import DropdownMenustyles from '../../styles/DropdownMenu.module.css';

import {
    HeaderWrapper,
    HeaderTitle,
    HeaderLogo,
    HeaderSearchContainer,
    HeaderButtonContainer,
    HeaderButton,
    HeaderIcon
} from './Header-style.js';

import Icon from '../Icon';

import { Input } from 'antd';
const { Search } = Input;

export default function Header({
    language, setLanguage,
    keyword, setKeyword,
    setSearch, setType,
    setSort, setRadius,
    setFilters, filterOptions
}) {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { token, setToken } = useContext(AuthContext);

    function onClickTitle() {
        setKeyword('');
        setSort('new');
        setType('all');
        setRadius(40075);
        setFilters(filterOptions);
        navigate('/home');
    }

    function onSearch() {
        setSearch(true);
        navigate('/home');
    }

    function changeLanguage() {
        if (language === 'zh') setLanguage('en');
        else if (language === 'en') setLanguage('zh');
    }

    function logout() {
        window.localStorage.clear(); //改掉的原因是因為login登入時不只有access_token，還有其他資料
        setToken(null);
        navigate('/login');
    }

    useEffect(() => {}, [setKeyword]);
    
    return (
        <HeaderWrapper>
            <HeaderTitle onClick={() => onClickTitle()}>isChange!</HeaderTitle>
            <HeaderLogo onClick={() => onClickTitle()} />
            <HeaderSearchContainer>
                <Search
                    id='header.search'
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    onSearch={() => onSearch()}
                />
            </HeaderSearchContainer>
            <HeaderButtonContainer>
                <HeaderIcon onClick={() => navigate('/chat-list')}>
                    <Icon.Chat />
                </HeaderIcon>
                <HeaderIcon className={DropdownMenustyles} onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <Icon.User />
                </HeaderIcon>
                <DropdownMenu isOpen={dropdownOpen} setIsOpen={setDropdownOpen} token={token} navigate={navigate} logout={logout} />
                <HeaderButton onClick={() => changeLanguage()}>
                    {language === 'zh' ? '中' : 'EN'}
                </HeaderButton>
            </HeaderButtonContainer>
        </HeaderWrapper>
    )
}