import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
    LayoutWrapper,
    Footer
} from './layout-style.js';

import Header from '../../components/Header';

import PersonalPostButton from '../../components/PersonalPostButton';
import CreateAllButton from '../../components/Button/CreateAllButton.js';
import GetFollowingList from '../../components/GetFollowingList';


export default function Layout({
    language, setLanguage,
    keyword, setKeyword,
    setSearch, setType,
    setSort, setRadius,
    setFilters, filterOptions
}) {
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };
    return (
        <LayoutWrapper>
            <Header
                language={language}
                setLanguage={setLanguage}
                keyword={keyword}
                setKeyword={setKeyword}
                setSearch={setSearch}
                setType={setType}
                setSort={setSort}
                setRadius={setRadius}
                setFilters={setFilters}
                filterOptions={filterOptions}
            />

            <Footer>
                <CreateAllButton openMenu={openMenu} toggleMenu={toggleMenu} />
                <PersonalPostButton openMenu={openMenu} toggleMenu={toggleMenu} />
                <GetFollowingList />
            </Footer>
            <Outlet />
        </LayoutWrapper>
    )
}