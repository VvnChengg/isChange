import axios from 'axios';

const hostname = process.env.REACT_APP_API_HOSTNAME;

export const editApi = {

    editPassWord: (origin_password, new_password, token) => {
        console.log(token)
        return axios.patch(`${hostname}/member/edit-page`, {
            origin_password: origin_password,
            new_password: new_password,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res)
                return res.data
            })
            .catch(err => {
                console.log(err)
                throw err
            });
    },

    editBasicInfo: (username, school, token) => {
        return axios.patch(`${hostname}/member/edit-page`, {
            username: username,
            exchange_school_name: school,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res)
                return res.data
            })
            .catch(err => {
                console.log(err)
                throw err
            });
    },


    editIntro: (intro, token) => {
        return axios.patch(`${hostname}/member/edit-page`, {
            intro: intro,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res)
                return res.data
            })
            .catch(err => {
                console.log(err)
                throw err
            });
    }

};