// 框架與api串接

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatRoomList from './ChatRoomList';
import { useToken } from '../../hooks/useToken';

function PrivateList() {
  const [rooms, setRooms] = useState();
  const hostname = process.env.REACT_APP_API_HOSTNAME;
  const token = useToken();
  //const userId = window.localStorage.getItem('user_id');

  useEffect(() => {
    

    axios.get(`${hostname}/chat/chatlist`, {
      headers: {
        'Authorization':  `Bearer ${token}`
      }
    })
    .then(response => {
      setRooms(response.data.chats);
    })
    .catch(error => {
    });
  }, [hostname, token]);

  return (
    <div>
      <div className='chatRoomListContainer'>
        <ChatRoomList rooms={rooms} />
      </div>
    </div>
  );
}

export default PrivateList;
