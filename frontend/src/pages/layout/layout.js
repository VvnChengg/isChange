import { Outlet } from 'react-router-dom';
import {
    LayoutWrapper,
    Footer
} from './layout-style.js';

import Header from '../../components/Header';

import PersonalPostButton from '../../components/PersonalPostButton';
import CreateAllButton from '../../components/Button/CreateAllButton.js';
import GetFollowingList from '../../components/GetFollowingList';
import { AuthContext } from '../../App';
import { useContext } from 'react';


export default function Layout({
    language, setLanguage,
    keyword, setKeyword,
    setSearch, setType,
    setSort, setRadius,
    setFilters, filterOptions
}) {
    const { token } = useContext(AuthContext);
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

            {token &&
                <Footer>
                    <CreateAllButton />
                    <PersonalPostButton />
                    <GetFollowingList />
                </Footer>
            }
            <Outlet />
        </LayoutWrapper>
    )
}