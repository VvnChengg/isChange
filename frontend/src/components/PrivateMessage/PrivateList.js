// 框架與api串接

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatRoomList from './ChatRoomList';

function PrivateList() {
  const [rooms, setRooms] = useState([]);
  const hostname = process.env.REACT_APP_API_HOSTNAME;

  useEffect(() => {
    const userId = window.localStorage.getItem('user_id');
    const token = window.localStorage.getItem('access_token');
    
    axios.get(`${hostname}/chat/chatlist`, {
      headers: {
        'Authorization':  `Bearer ${token}`
      }
    })
    .then(response => {
      setRooms(response.data.chats);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <div>
      <div className='chatRoomListContainer'>
        <ChatRoomList rooms={rooms} />
      </div>
    </div>
  );
}

export default PrivateList;
