import axios from 'axios';

const hostname = process.env.REACT_APP_API_HOSTNAME;

export const editApi = {

    editPassWord: (origin_password, new_password, token) => {
        // console.log(token)
        return axios.patch(`${hostname}/member/edit-page`, {
            origin_password: origin_password,
            new_password: new_password,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // console.log(res)
                return res.data
            })
            .catch(err => {
                // console.log(err)
                throw err
            });
    },

    editBasicInfo: (username, school, token) => {
        console.log(token);
        return axios.patch(`${hostname}/member/edit-page`, {
            username: username,
            exchange_school_name: school,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // console.log(res)
                return res.data
            })
            .catch(err => {
                // console.log(err)
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
                // console.log(res)
                return res.data
            })
            .catch(err => {
                // console.log(err)
                throw err
            });
    },

    editImage: (formData, token) => {
        return axios.patch(`${hostname}/member/edit-page`,
            formData, {

            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }, )
            .then(res => {
                // console.log(res)
                return res.data
            })
            .catch(err => {
                // console.log(err)
                throw err
            });
    },

    // 寄送學生信箱驗證碼
    editStudentVeriSendCode: (exchange_school_email, token) => {
        return axios.patch(`${hostname}/member/stud-ver-code`, {
            exchange_school_email: exchange_school_email,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }, )
        .then(res => {
            return res.data
        })
        .catch(err => {
            // console.log(err);
            throw err
        });
    },

    // 學生信箱驗證碼驗證
    editStudentVeri: (exchange_school_email, veriCode,token) => {
        return axios.patch(`${hostname}/member/stud-ver`, {
            exchange_school_email: exchange_school_email,
            verification_code: veriCode
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }, )
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err);
            throw err
        });
    }

};