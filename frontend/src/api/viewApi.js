import axios from 'axios';

const hostname = process.env.REACT_APP_API_HOSTNAME;

export const viewApi = {
    // 取得登入者資料
    getMember: (token) => {
        return axios.get(`${hostname}/member/edit-page`, { 
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            // console.log(res);
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
    },

    getOtherMemberPosts: (username) => {
        return axios.get(`${hostname}/member/posts/${username}`)
        .then(res => {
            // console.log(res);
            return res.data
        })
        .catch(err => {
            // console.log(err)
            return err
        });
    },

    changeFollowStatus: (username, token) => {
        return axios.put(`${hostname}/member/follow/${username}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err
        });
    },

    getFollowingList: (token) => {
        return axios.get(`${hostname}/member/followers`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err
        });
    },
}