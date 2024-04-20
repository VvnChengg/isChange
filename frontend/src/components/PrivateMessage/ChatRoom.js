import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  './ChatRoom.css';


export default function ChatRoom({chatid}) {
  let lastDate = null; // 追蹤上一條消息的日期
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
            {/* <img className='private-message-photo' src={image || "/icons/profile.png"} alt='Profile' onError={(e) => { e.target.onerror = null; e.target.src="/icons/profile.png"; }} /> */}
            {/* <img className='private-message-photo' src={chatData.chat_to_photo} alt="Avatar"/> */}
            <img className='private-message-photo' src={chatData.chat_to_photo|| "/icons/profile.png"} alt="Avatar" onError={(e) => { e.target.onerror = null; e.target.src="/icons/profile.png"; }}/> 
            <p className='private-message-name'>{chatData.chat_to_username}</p>
          </div>

          {/* 渲染訊息 */}
          {chatData.messages.map(message => {
            const messageDate = new Date(message.timestamp);
            const formattedDate = `${messageDate.getFullYear()}/${(messageDate.getMonth() + 1).toString().padStart(2, '0')}/${messageDate.getDate().toString().padStart(2, '0')}`;
            const formattedHours = messageDate.getHours().toString().padStart(2, '0');
            const formattedMinutes = messageDate.getMinutes().toString().padStart(2, '0');
            const showDate =  formattedDate !== lastDate;
            lastDate = formattedDate; // 更新上一條消息的日期

            return (
              <div className='private-message-message-container' key={message._id}>
                {showDate && (
                  <div className="private-message-date-container">
                    <p className="private-message-date">{formattedDate}</p>
                  </div>
                )}
                <div className={`private-message-message-box ${message.sender_id === userId ? "private-message-own-message" : ""}`}>
                  <p className="private-message-message-content">{message.content}</p>
                  <p className="private-message-time">{formattedHours}:{formattedMinutes}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}