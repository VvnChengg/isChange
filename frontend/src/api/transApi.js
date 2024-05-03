import axios from "axios";

const hostname = process.env.REACT_APP_API_HOSTNAME;

export const transApi = {
    viewTrans: (tid, user_id, token) => {
        return axios.get(`${hostname}/trans/detail/${tid}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => {
            return res.data
          })
          .catch(err => {
            return err
          });
  
    },

    createTrans: (data, token) => {
        return axios.post(`${hostname}/trans/create`, {
            product_title: data.trans_title,
            product_pic: data.product_pic,
            description: data.trans_intro,
            product_type: data.product_type,
            currency: data.currency,
            price: data.budget,
            period: data.rent_start_time + ' - ' + data.rent_end_time,
            transaction_region: data.transaction_region,
            transaction_way: data.trans_type,
            user_id: data.user_id,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err
        });
    },

    editViewTrans: (tid, user_id, token) => {
        // console.log(user_id);
        // console.log(tid);
        return axios.get(`${hostname}/trans/edit/${tid}`, {
          params: {
            user_id: user_id
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

    editTrans: (data, token) => {
        return axios.put(`${hostname}/trans/edit/${data.tid}`,{
            product_title: data.trans_title,
            product_pic: data.product_pic,
            description: data.trans_intro,
            product_type: data.product_type,
            currency: data.currency,
            price: data.budget,
            period: data.rent_start_time + ' - ' + data.rent_end_time,
            transaction_region: data.transaction_region,
            transaction_way: data.trans_type,
            user_id: data.user_id,
        }, {
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