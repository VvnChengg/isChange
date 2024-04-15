import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  './ChatRoom.css';



export default function ChatRoom({chatid}) {
  //const hostname = 'http://localhost:3000/api';
  const hostname = process.env.REACT_APP_API_HOSTNAME;
  const [chatData, setChatData] = useState(null);
  // const userId = "660bbad71dd21a48510f209c";
  const userId = window.localStorage.getItem('user_id');
  // console.log(userId)
  const token = window.localStorage.getItem('access_token');
  useEffect(() => {
    // 發送 API 請求
    axios.get(`${hostname}/chat/detail/${chatid}`, {headers: {
      'Authorization':  `Bearer ${token}`
  }})
      .then(response => {
        // 設置獲取到的數據
        console.log(response.data);
        setChatData(response.data);
        
      })
      .catch(error => {
        console.error('API 請求失敗:', error);
      });
  }, [chatid]);

  return (
    <div >
      {/* 確保 chatData 已經被設置，然後將其傳遞給 ChatRoom 組件 */}
      {chatData && (
        <div className="private-message-chat-room-container" >
          {/* 渲染聊天對象的頭像和用戶名 */}
          <div className="private-message-chat-header">
            <img src={chatData.chat_to_photo} alt="chat-to-avatar" />
            <p>{chatData.chat_to_username}</p>
          </div>

          {/* 渲染訊息 */}
          {chatData.messages.map(message => (
            <div className='private-message-message-container'>
              <div className={`private-message-message-box ${message.sender_id === userId ? "private-message-own-message" : ""}`} key={message._id}>
                <p className="private-message-message-content">{message.content}</p>
                <p className="private-message-timestamp">{new Date(message.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}