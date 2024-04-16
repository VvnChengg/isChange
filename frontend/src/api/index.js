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
              axios.post(hostname + '/post/create', { post }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.data)
            .catch(err => console.log(err))
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
