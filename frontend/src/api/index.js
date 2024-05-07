import axios from 'axios';
import { toast } from 'react-toastify';

const hostname = process.env.REACT_APP_API_HOSTNAME;

export const api = {
    getChatList: () => {
        return (
            axios.get(hostname + '/chat/chatlist')
                .then(res => res.data.chats)
                .catch(err => console.log(err))
        )
    },
    getAllPosts: () => {
        return (
            axios.get(hostname + '/post/all')
                .then(res => res.data.result)
                .catch(err => console.log(err))
        )
    },
    getHotPosts: () => {
        return (
            axios.get(hostname + '/post/hot')
                .then(res => res.data)
                .catch(err => console.log(err))
        )
    },
    createPost: (post) => {
        const token = window.localStorage.getItem('access_token');
        function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }
        const file = post.photo === "" ? "" : dataURLtoFile(post.photo, 'post.png');
        const formData = new FormData();

        formData.append('title', post.title);
        formData.append('content', post.content);
        formData.append('article_pic', file);
        formData.append('user_id', window.localStorage.getItem('user_id'));

        return axios.post(hostname + '/post/create',
            formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                throw err
            });
    },
    postImage: (formData, token) => {
        return axios.patch(`${hostname}/member/edit-page`,
            formData, {

            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        },)
            .then(res => {
                // console.log(res)
                return res.data
            })
            .catch(err => {
                // console.log(err)
                throw err
            });
    },
    updatePost: (pID, post) => {
        const token = window.localStorage.getItem('access_token');

        return (
            axios.put(`${hostname}/post/${pID}`, {
                title: post.title,
                content: post.content,
                //   photo: post.photo,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    toast.success(`更新成功！`);
                    return res.data;
                })
                .catch(err => {
                    console.log(pID)
                    console.log(post)
                    console.log(err)
                    throw err
                })
        )
    },
    deleteUserPost: (pID) => {
        const token = window.localStorage.getItem('access_token');
        return axios.delete(`${hostname}/post/${pID}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(pID);
                console.log(res.data.message);
                toast.success(`${res.data.message}`);
                return res.data;
            })
            .catch(err => {
                throw err;
            });
    },
    getPostDetail: (pID) => {
        // const token = window.localStorage.getItem('access_token');
        return axios.get(`${hostname}/post/detail/${pID}`)
            .then(res => {
                console.log(pID);
                console.log(res);
                return res.data;
            })
            .catch(err => {
                console.log(err)
                throw err;
            });
    },
    pressLike: (pID) => {
        const token = window.localStorage.getItem('access_token');

        return (
            axios.put(`${hostname}/post/like/${pID}`, { pID }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    toast.success(`${res.data.message}`);
                    return res.data;
                })
                .catch(err => {
                    console.log(pID)
                    console.log(err)
                    throw err
                })
        )
    },
    createTour: (tour) => {
        const token = window.localStorage.getItem('access_token');

        return (
            axios.post(hostname + '/tour/create', tour, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.data)
                .catch(err => err)
        )
    }
};
