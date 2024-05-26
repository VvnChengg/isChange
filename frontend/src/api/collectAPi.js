import axios from "axios";

const hostname = process.env.REACT_APP_API_HOSTNAME;


export const collectApi = {
    collectPost: (post_id, user_id, type, token) => {
        return axios.post(`${hostname}/common/favorite`,
            {
                post_id: post_id,
                user_id: user_id,
                type: type
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                // console.log(res);
                return res.data
            })
            .catch(err => {
                // console.log(err);
                return err
            });
    },

    getMyCollectPost: (user_id, token) => {
        return axios.get(`${hostname}/common/favorite/${user_id}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err
        });
    },

    getMyCollectPostList: (user_id, token) => {
        return axios.get(`${hostname}/common/favorite_list/${user_id}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err
        });

    }
}