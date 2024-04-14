import axios from 'axios';

const hostname = process.env.REACT_APP_API_HOSTNAME;

export const registerApi = {
    // 寄送驗證信
    register: (email) => {
        return axios.post(`${hostname}/member-auth/register/email`, {
            email: email
        })
            .then(res => {
                if (res.data.status === 'verified') {
                    console.log('Verification code has been sent');
                } else {
                    console.log('Failed to send verification code: ' + res.data.message);
                }
                return res.data;
            })
            .catch(err => console.log(err));
    },

    // 確認驗證碼與記錄相符
    verifyEmailGet: (email, verification_code) => {
        return axios.get(`${hostname}/member-auth/register/verification`, {
            params: {
                email: email,
                verification_code: verification_code
            }
        })
            .then(res => {
                console.log(res)
                return res.data})
            .catch(err => console.log(err));
    },

    // 檢查使用者名稱是否重複
    verifyUsername: (username) => {
        return axios.get(`${hostname}/member-auth/register/checkuser`, {
            params: {
                username: username
            }
        })
            .then(res => {
                console.log(res)
                return res.data})
            .catch(err => console.log(err));
    },

    // 送出註冊資料
    verifyMemberPatch: (email, password, username, exchange_school_name) => {
        return axios.patch(`${hostname}/member-auth/register`, {
            email: email,
            password: password,
            username: username,
            exchange_school_name: exchange_school_name
        })
            .then(res => {
                console.log(res)
                return res.data})
            .catch(err => console.log(err));
    },

};