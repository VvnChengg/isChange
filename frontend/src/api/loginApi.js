import axios from 'axios';

const hostname = process.env.REACT_APP_API_HOSTNAME;

export const loginApi = {
    // 登入前檢查是否已註冊
    login_or_register: (email) => {
        return axios.get(`${hostname}/member-auth/login-or-register`, {
            params: {
                email: email
            }
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            throw err;
        });
    },

    // 登入
    login: (email, password) => {
        return axios.post(`${hostname}/member-auth/login`, {
            email: email,
            password: password
        })
        .then(res => {
            if (res.data.status === 'success') {
                // 如果登入成功，則將使用者資訊存儲到 localStorage 中
                const now = new Date();
                const expiryTime = now.getTime() + 3600000; // 設定token過期時間為 1 hour later    
                localStorage.setItem('user_id', res.data.data.user_id);
                localStorage.setItem('email', res.data.data.email);
                localStorage.setItem('access_token', res.data.data.access_token);
                localStorage.setItem('source', res.data.data.source);
                localStorage.setItem('expiry_time', expiryTime.toString());

                setTimeout(() => {
                }, 1000);
            

                return res.data;
            }
            return res.data;
        })
        .catch(err => {
            throw err;
        });
    },

    // 忘記密碼
    forgetPassword: (email, password) => {
        return axios.patch(`${hostname}/member-auth/forget-pwd`, {
            email: email,
            password: password
        })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            throw err;
        });
    },


    // SSO
    sso_login: (tokenId) =>{
        return axios.post(`${hostname}/sso/googleSignIn`, {
            tokenId: tokenId
        })
        .then(res =>{
            if(res.data.status === 'success'){
                const now = new Date();
                const expiryTime = now.getTime() + 3600000; // 設定token過期時間為 1 hour later    
                localStorage.setItem('user_id', res.data.data.user_id);
                localStorage.setItem('email', res.data.data.email);
                localStorage.setItem('access_token', res.data.data.access_token);
                localStorage.setItem('source', res.data.data.source);
                localStorage.setItem('expiry_time', expiryTime.toString());
            }
            return res.data;
        })
        .catch(err =>{
            throw err;
        })
    },

};