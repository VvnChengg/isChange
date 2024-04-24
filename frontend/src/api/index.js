import axios from 'axios';

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
    createPost: (post) => {
          const token = window.localStorage.getItem('access_token');

          return (
              axios.post(hostname + '/post/create', { 
                title: post.title,
                content: post.content
               }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.data)
            .catch(err => console.log(err))
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
                alert(`${res.data.message}`);
                return res.data;
            })
            .catch(err => {
                throw err;
            });
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
