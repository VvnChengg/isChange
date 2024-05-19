import axios from 'axios';

const hostname = process.env.REACT_APP_API_HOSTNAME;

export const viewApi = {
    // 取得登入者資料
    getMember: (token) => {
        return axios.get(`${hostname}/member/edit-page`, { 
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            console.log(res);
            return res.data
        })
        .catch(err => {
            // console.log(err)
            return err
        });
    },

    // 取得其他會員資料
    getOtherMember: (user_id) => {
        return axios.get(`${hostname}/member/${user_id}`)
        .then(res => {
            // console.log(res);
            return res.data
        })
        .catch(err => {
            // console.log(err)
            return err
        });
    }
}