// PrivateMessageList.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import PrivateList from '../../components/PrivateMessage/PrivateList';
import { toast } from 'react-toastify';

export default function PrivateMessageList() {
    const intl = useIntl();
    const navigate = useNavigate();

    useEffect(() => {
        const token = window.localStorage.getItem('access_token');
        if (!token) {
            toast.error(intl.formatMessage({ id: 'alert.login' }));
            navigate('/login');
        }
    }, []);

    return (
        <div>
            <PrivateList />
        </div>
    );
}
