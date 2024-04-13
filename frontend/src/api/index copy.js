import axios from 'axios';

const hostname = 'http://localhost:3000';

export const api = {
    /* template */
    getChatList: () => {
         return (
            axios.get(hostname + '/chat/chatlist')
             .then(res => res.data.chats)
             .catch(err => console.log(err))
         )
     },
};
  