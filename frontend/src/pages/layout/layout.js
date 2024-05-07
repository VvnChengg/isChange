import { Outlet } from 'react-router-dom';
import { LayoutWrapper } from './layout-style.js';

import Header from '../../components/Header';

export default function Layout({ language, setLanguage, setKeyword }) {
    return (
        <LayoutWrapper>
            <Header language={language} setLanguage={setLanguage} setKeyword={setKeyword} />
            <Outlet />
        </LayoutWrapper>
    )
}