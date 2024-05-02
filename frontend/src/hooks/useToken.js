// useToken.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

export const useToken = () => {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const intl = useIntl();

    useEffect(() => {
        const storedToken = localStorage.getItem('access_token');

        // 判斷是否有token，若無則導向登入頁面
        if (!storedToken) {
            console.log('here')
            toast.error(intl.formatMessage({ id: 'token.pleaseLogIn' }));
            navigate('/login');
            return;
        }

        // 判斷 token 是否過期
        const now = new Date();
        const expiryTime = localStorage.getItem('expiry_time');
        if (now.getTime() > Number(expiryTime)) {
            toast.error(intl.formatMessage({ id: 'token.Expiry' }));
            localStorage.clear();
            navigate('/login');
            return
        }

        setToken(storedToken);
    }, [intl, navigate]);

    return token;
};