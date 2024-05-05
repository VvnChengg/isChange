import axios from "axios";

const hostname = process.env.REACT_APP_API_HOSTNAME;


export const tourApi = {
    viewTour: (tid) => {
        return axios.get(`${hostname}/tour/detail/${tid}`)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            });
    },

    editViewTour: (tid, user_id, token) => {
        // console.log(user_id);
        // console.log(tid);
        return axios.get(`${hostname}/tour/edit/${tid}`, {
            params: {
                userId: user_id
            },
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            });
    },

    editTour: (data, token) => {
        return axios.put(`${hostname}/tour/edit/${data.tid}`,
                data, 
            {
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