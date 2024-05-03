// chat-room.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ChatRoom from '../../components/PrivateMessage/ChatRoom';
import ChatRoomInput from '../../components/PrivateMessage/ChatRoomInput';
import { useToken } from '../../hooks/useToken';


export default function Chatroom() {
    const { chatid } = useParams();
    const [chatPhoto, setChatPhoto] = useState(null);
    const [chatData, setChatData] = useState(null);
    //const [newchatData, setnewChatData] = useState(null);
    const userId = window.localStorage.getItem('user_id');
    const hostname = process.env.REACT_APP_API_HOSTNAME;
    const token = useToken();
    const [inputValue, setInputValue] = useState('');

    const handleDownload = (imageUrl) => {
        const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.jpg'; // 下載的文件名，可以自行設定
    link.style.display = 'none'; // 隱藏這個元素

    // 將這個元素添加到 body 中
    document.body.appendChild(link);

    // 模擬點擊這個鏈接
    link.click();

    // 清理
    document.body.removeChild(link);
};


    const handleSubmit = () => {
        if (inputValue.trim() !== '') {
        const body = {content: inputValue.trim(),};
        //console.log(body)
        
        axios.post(`${hostname}/chat/sendtext/${chatid}`, body,{
            headers: {
                'Authorization':  `Bearer ${token}`
            }
        })
        .then(response => {
          //setnewChatData(response.data.new_message);
          setChatData(prevChatData => [...prevChatData, response.data.new_message]);
          //console.log(newchatData)
          setInputValue('');

          setTimeout(() => {
            const chatBox = document.querySelector('.private-message-chat-room-container');
            chatBox.scrollTop = chatBox.scrollHeight;
          }, 100); 
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

    const scrollToBottom = () => {
            setTimeout(() => {
                const chatBox = document.querySelector('.private-message-chat-room-container');
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 0);
        };
    
    

    
    useEffect(() => {
        axios.get(`${hostname}/chat/detail/${chatid}`, {
            headers: {
                'Authorization':  `Bearer ${token}`
            }
        })
        .then(response => {
            setChatPhoto(response.data);
            setChatData(response.data.messages);
            //console.log(chatData)
            scrollToBottom(); 
        })
        .catch(error => {
            console.error('API 請求失敗:', error);
        });
    }, [hostname, chatid, token]);

    return (
        
        <div>
            <ChatRoom chatData={chatData} chatPhoto={chatPhoto} userId={userId} handleDownload={handleDownload}/>
            <ChatRoomInput 
                handleInputChange={handleInputChange} 
                inputValue={inputValue} 
                handleSubmit={handleSubmit}
                handleKeyDown={handleKeyDown}
            />
        </div>
    );
}
