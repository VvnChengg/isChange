import axios from 'axios';

const hostname = 'http://localhost:3000/api/member-auth';

export const loginApi = {
    // 登入前檢查是否已註冊
    login_or_register: (email) => {
        console.log('email:', email);
        return axios.get(`${hostname}/login-or-register`, {
            params: {
                email: email
            }
        })
        .then(res => {
            console.log(res)
            if(res.data.status === 'success'){
                console.log('Login or register successful:', res.data);
                return 1;
            } else {
                console.log('Login or register failed: ' + res.data.message);
                return null;
              }
        })
        .catch(err => console.log(err));
    },

    // 登入api    
    login: (email, password) => {
        return axios.post(`${hostname}/login`, {
            email: email,
            password: password
        })
        .then(res => {
            if (res.data.status === 'success') {
                console.log('Save localStorage data');
                // 如果登入成功，則將使用者資訊存儲到 localStorage 中
                localStorage.setItem('user_id', res.data.data.user_id);
                localStorage.setItem('email', res.data.data.email);
                localStorage.setItem('access_token', res.data.data.access_token);
                alert('登入成功');
            }else{
                alert('登入失敗');
            }
            return res.data;
        })
        .catch(err => console.log(err));
    },

};