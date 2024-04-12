import axios from 'axios';

const hostname = 'http://localhost:3000/api';

export const registerApi = {
    // 寄送驗證信
    register: (email) => {
        return axios.post(`${hostname}/register`, {
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
        return axios.get(`${hostname}/register`, {
            params: {
                email: email,
                verification_code: verification_code
            }
        })
            .then(res => res.data)
            .catch(err => console.log(err));
    },

    verifyEmailPatch: (email, verification_code) => {
        return axios.patch(`${hostname}/register`, {
            email: email,
            verification_code: verification_code
        })
            .then(res => res.data)
            .catch(err => console.log(err));
    },

};