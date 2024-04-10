import { Outlet } from 'react-router-dom';
import { LayoutWrapper } from './layout-style.js';

import Header from '../../components/Header';

export default function Layout() {
    return (
        <LayoutWrapper>
            <Header />
            <Outlet />
        </LayoutWrapper>
    )
}