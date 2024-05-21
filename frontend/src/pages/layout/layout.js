import { Outlet } from 'react-router-dom';
import { LayoutWrapper } from './layout-style.js';

import Header from '../../components/Header';

import PersonalPostButton from '../../components/PersonalPostButton';
import CreateAllButton from '../../components/Button/CreateAllButton.js';

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

            <div style={{
                display: 'flex',
                position: 'fixed',
                left: 0,
                bottom: 0,
                zIndex: 9999
            }}>
                <PersonalPostButton />
                <CreateAllButton />
            </div>
            <Outlet />
        </LayoutWrapper>
    )
}