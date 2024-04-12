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
};
  