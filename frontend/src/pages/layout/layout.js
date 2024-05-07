import { Outlet } from 'react-router-dom';
import { LayoutWrapper } from './layout-style.js';

import Header from '../../components/Header';

export default function Layout({ language, setLanguage, keyword, setKeyword, setSearch }) {
    return (
        <LayoutWrapper>
            <Header
                language={language}
                setLanguage={setLanguage}
                keyword={keyword}
                setKeyword={setKeyword}
                setSearch={setSearch}
            />
            <Outlet />
        </LayoutWrapper>
    )
}