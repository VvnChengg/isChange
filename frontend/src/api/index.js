import axios from 'axios';

const hostname = 'http://localhost:3000';

export const api = {
    getAllPosts: () => {
        return (
            axios.get(hostname + '/post/all')
            .then(res => res.data.articles)
            .catch(err => console.log(err))
        )
    },
};
  