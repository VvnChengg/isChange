import axios from 'axios';

const hostname = process.env.REACT_APP_API_HOSTNAME;

export const viewApi = {
    getMember: (token) => {
        return axios.get(`${hostname}/member/edit-page`, { 
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            console.log(res);
            return res.data
        })
        .catch(err => {
            console.log(err)
            return err
        });
    },
}