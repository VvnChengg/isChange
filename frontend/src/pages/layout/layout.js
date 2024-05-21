import { Outlet } from 'react-router-dom';
import { LayoutWrapper } from './layout-style.js';

import Header from '../../components/Header';

import PersonalPostButton from '../../components/PersonalPostButton';

export default function Layout({
    language, setLanguage,
    keyword, setKeyword,
    setSearch, setType,
    setSort, setRadius,
    setFilters, filterOptions
}) {
    
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
            <PersonalPostButton />
            <Outlet />
        </LayoutWrapper>
    )
}