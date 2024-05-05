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



}