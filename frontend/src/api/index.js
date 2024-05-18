import axios from 'axios';
import qs from 'qs';
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
    getGeoPosts: () => {
        return (
            axios.get(hostname + '/geo/sort')
                .then(res => res.data)
                .catch(err => console.log(err))
        )
    },
    filterGeoPosts: (radius) => {
        return (
            axios.get(hostname + '/geo/filter?radius=' + radius)
                .then(res => res.data)
                .catch(err => {
                    if (err.response.data.message === '沒有找到任何內容')
                        throw (err.response.data.message);
                    else console.log(err);
                })
        )
    },
    searchPosts: (keyword) => {
        return (
            axios.get(hostname + '/post/search?keyword=' + keyword)
            .then(res => res.data.result)
            .catch(err => console.log(err))
        )
    },
    createPost: (post, token) => {
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
        formData.append('userId', post.user_id);
        formData.append('article_region_en', JSON.stringify(post.destination_en));
        formData.append('article_region_zh', JSON.stringify(post.destination_zh));
        formData.append('location', JSON.stringify(post.location));



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
                console.log(err);
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
    updatePost: (pID, post, token) => {
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
        formData.append('userId', post.user_id);
        formData.append('article_region_en', JSON.stringify(post.destination_en));
        formData.append('article_region_zh', JSON.stringify(post.destination_zh));
        formData.append('location', JSON.stringify(post.location));

        return (
            axios.put(`${hostname}/post/${pID}`, 
                formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    return res.data;
                })
                .catch(err => {
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
        const user_id = window.localStorage.getItem('user_id');
        // console.log(user_id);
        return axios.get(`${hostname}/post/detail/${pID}`, {
            params: {
                userId: user_id
            }
        })
        .then(res => {
            return res.data;
        })
        .catch(err => {
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
                    console.log(res);
                    return res.data;
                })
                .catch(err => {
                    console.log(pID)
                    console.log(err)
                    throw err
                })
        )
    },
    commentPost: (comment) => {
        const token = window.localStorage.getItem('access_token');
        // const formData = new FormData();

        // formData.append('pid', comment.pID);
        // formData.append('content', comment.content);
        // formData.append('datetime', comment.datetime);
        // formData.append('userId', window.localStorage.getItem('user_id'));
        console.log('commenttt');
        console.log(comment.pID);
        
        const pid = comment.pID;
        const content = comment.content;
        const datetime = comment.datetime;
        console.log('formData');
        // console.log(userID);
        // const commentInfo = {pid, content, datetime, userID}
        console.log('formData');
        // console.log(commentInfo);
        return (
            axios.post(hostname + '/post/comment', {
            // commentInfo
            pid: pid,
            text: content
            // datetime: datetime
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
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
