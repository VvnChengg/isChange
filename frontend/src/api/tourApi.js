import axios from "axios";

const hostname = process.env.REACT_APP_API_HOSTNAME;


export const tourApi = {
    viewTour: (tid, user_id) => {
        return axios.get(`${hostname}/tour/detail/${tid}`, {
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

    editViewTour: (tid, user_id, token) => {
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
        // 把base64轉成file
        function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }
        const file = data.event_pic === "" ? "" : dataURLtoFile(data.event_pic, 'tour.png');
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key === 'destination_en' || key === 'destination_zh' || key === 'location') {
                formData.append(key, JSON.stringify(value));
            } else if (key === 'event_pic') {
                formData.append(key, file);
            } else if (key === 'user_id') {
                formData.append('userId', value);
            } else if (key === 'save_by_user_ids' || key === 'like_by_user_ids') {
                return
            }
            else {
                formData.append(key, value);
            }
        });

        return axios.put(`${hostname}/tour/edit/${data.tid}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
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

    createTour: (data, token) => {
        // 把base64轉成file
        function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }
        const file = data.event_pic === "" ? "" : dataURLtoFile(data.event_pic, 'tour.png');
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key === 'destination_en' || key === 'destination_zh' || key === 'location') {
                formData.append(key, JSON.stringify(value));
            } else if (key === 'event_pic') {
                formData.append(key, file);
            } else if (key === 'user_id') {
                formData.append('userId', value)
            } else {
                formData.append(key, value);
            }
        });


        return axios.post(`${hostname}/tour/create`,
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