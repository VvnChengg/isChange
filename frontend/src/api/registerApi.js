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
    verifyEmailPost: (email, verification_code) => {
        // console.log(email, verification_code);
        return axios.post(`${hostname}/member-auth/register/verification`, {
            email: email,
            verification_code: verification_code
        })
            .then(res => {
                console.log(res)
                return res.data
            })
            .catch(err => {
                // console.log(err)
                throw err
            });
    },

    // 檢查使用者名稱是否重複(先拿掉email，後端應該也會改掉，但如果出錯可以直接註解掉email看看)
    verifyUsername: (username, email) => {
        return axios.get(`${hostname}/member-auth/register/checkuser`, {
            params: {
                username: username,
                // email: email
            }
        })
            .then(res => {
                // console.log("使用者名稱res", res);
                return res.data;
            })
            .catch(err => {
                // console.error('Error:', err.response ? err.response.data : err.message);
                throw err;
            });
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
                return res.data
            })
            .catch(err => console.log(err));
    },

};