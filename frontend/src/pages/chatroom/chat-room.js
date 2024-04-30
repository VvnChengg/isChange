// chat-room.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ChatRoom from '../../components/PrivateMessage/ChatRoom';
import ChatRoomInput from '../../components/PrivateMessage/ChatRoomInput';
import { useToken } from '../../hooks/useToken';


export default function Chatroom() {
    const { chatid } = useParams();
    const [chatData, setChatData] = useState(null);
    const userId = window.localStorage.getItem('user_id');
    const hostname = process.env.REACT_APP_API_HOSTNAME;
    const token = useToken();
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        if (inputValue.trim() !== '') {
        const body = {content: inputValue.trim(),};
        console.log(body)
        
        axios.post(`${hostname}/chat/sendtext/${chatid}`, body,{
            headers: {
                'Authorization':  `Bearer ${token}`

            }

        })
        .then(response => {
          console.log('API 返回的结果:', response.data);
          setChatData(response.data);
          setInputValue('');
        })
        .catch(error => {
          console.error('API 請求失败:', error);
        });
    } else {
      console.log('請輸入有效值');
    }
  };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); 
            handleSubmit();
          }
        };

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
    }, [hostname, chatid, token]);

    return (
        <div>
            <ChatRoom chatData={chatData} userId={userId} />
            <ChatRoomInput 
                handleInputChange={handleInputChange} 
                inputValue={inputValue} 
                handleSubmit={handleSubmit}
                handleKeyDown={handleKeyDown}
            />
        </div>
    );
}
