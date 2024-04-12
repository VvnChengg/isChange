import axios from 'axios';

const hostname = 'http://localhost:3000/api';

export const api = {
    getAllPosts: () => {
        return (
            axios.get(hostname + '/post/all')
            .then(res => res.data.result)
            .catch(err => console.log(err))
        )
    },
    createTour: (tour) => {
        const token = window.localStorage.getItem('access_token');

        return (
            axios.post(hostname + '/tour/create', { tour }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.data)
            .catch(err => console.log(err))
        )
    }
};
  