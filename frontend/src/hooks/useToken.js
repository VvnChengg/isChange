// useToken.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useToken = () => {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('access_token');

        // 判斷是否有token，若無則導向登入頁面
        if (!storedToken) {
            alert('請先登入');
            navigate('/login');
            return;
        }

        // 判斷 token 是否過期
        const now = new Date();
        const expiryTime = localStorage.getItem('expiry_time');
        if (now.getTime() > Number(expiryTime)) {
            alert('登入逾時，請重新登入');
            localStorage.clear();
            navigate('/login');
            return
        }

        setToken(storedToken);
    }, []);

    return token;
};