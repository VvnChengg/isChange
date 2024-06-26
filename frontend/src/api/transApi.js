import axios from "axios";

const hostname = process.env.REACT_APP_API_HOSTNAME;

export const transApi = {
    viewTrans: (tid, user_id) => {
        return axios.get(`${hostname}/trans/detail/${tid}`, {
            params: {
                userId: user_id
            },
        })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            });

    },

    createTrans: (data, token) => {
        // 把base64轉成file
        function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }
        const file = data.product_pic == null || data.product_pic == "" ? "" : dataURLtoFile(data.product_pic, 'transaction.png');
        const formData = new FormData();

        // console.log(JSON.stringify(data.destination_zh));
        formData.append('product_title', data.trans_title);
        formData.append('product_pic', file); // Assuming data.product_pic is a File or Blob object
        formData.append('description', data.trans_intro);
        formData.append('product_type', data.product_type);
        formData.append('currency', data.currency);
        formData.append('price', data.budget);
        formData.append('period', data.rent_start_time + ' - ' + data.rent_end_time);
        formData.append('transaction_way', data.trans_type);
        formData.append('user_id', data.user_id);
        formData.append('transaction_region_en', JSON.stringify(data.destination_en));
        formData.append('transaction_region_zh', JSON.stringify(data.destination_zh));
        formData.append('location', JSON.stringify(data.location));

        return axios.post(`${hostname}/trans/create`,
            formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
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
        // 把base64轉成file
        function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }

        const file = data.product_pic == null || data.product_pic == "" ? "" : dataURLtoFile(data.product_pic, 'transaction.png');
        const formData = new FormData();

        formData.append('product_title', data.trans_title);
        formData.append('product_pic', file); // Assuming data.product_pic is a File or Blob object
        formData.append('description', data.trans_intro);
        formData.append('product_type', data.product_type);
        formData.append('currency', data.currency);
        formData.append('price', data.budget);
        formData.append('period', data.rent_start_time + ' - ' + data.rent_end_time);
        // formData.append('transaction_region', data.transaction_region);
        formData.append('transaction_region', data.transaction_country); //後端是string, 先放string
        formData.append('transaction_way', data.trans_type);
        formData.append('userId', data.user_id);
        formData.append('status', data.trans_status);
        formData.append('transaction_region_en', JSON.stringify(data.destination_en));
        formData.append('transaction_region_zh', JSON.stringify(data.destination_zh));
        formData.append('location', JSON.stringify(data.location));

        return axios.put(`${hostname}/trans/edit/${data.tid}`,
            formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            });

    },
}