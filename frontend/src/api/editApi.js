import axios from 'axios';

const hostname = process.env.REACT_APP_API_HOSTNAME;

export const editApi = {
    editUser: (userId, userData) => {
        return axios.patch(`${hostname}/user/${userId}`, userData)
            .then(res => res.data)
            .catch(err => console.log(err));
    },

    editPost: (postId, postData) => {
        return axios.patch(`${hostname}/post/${postId}`, postData)
            .then(res => res.data)
            .catch(err => console.log(err));
    },

    // ...other edit methods...
};