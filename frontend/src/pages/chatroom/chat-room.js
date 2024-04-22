// chat-room.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ChatRoom from '../../components/PrivateMessage/ChatRoom';

export default function Chatroom() {
    const { chatid } = useParams();
    const [chatData, setChatData] = useState(null);
    const userId = window.localStorage.getItem('user_id');
    const hostname = process.env.REACT_APP_API_HOSTNAME;
    const token = window.localStorage.getItem('access_token');

    useEffect(() => {
        axios.get(`${hostname}/chat/detail/${chatid}`, {
            headers: {
                'Authorization':  `Bearer ${token}`
            }
        })
        .then(response => {
            setChatData(response.data);
        })
        .catch(error => {
            console.error('API 請求失敗:', error);
        });
    }, [chatid, token]);

    return (
        <div>
            <ChatRoom chatData={chatData} userId={userId} />
        </div>
    );
}
