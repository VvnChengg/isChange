// comment.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import CommentList from '../../components/Comment/CommentList';
import { toast } from 'react-toastify';

export default function Comment() {
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
            <CommentList />
        </div>
    );
}
