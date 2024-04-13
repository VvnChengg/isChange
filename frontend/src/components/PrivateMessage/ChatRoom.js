import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatRoom.css';



export default function ChatRoom({chatId}) {
  const hostname = 'http://localhost:3000/api';
  const [chatData, setChatData] = useState(null);
  //const chatId = '6614e7491dd21a48510f2108'
  const user_id = "660bbad71dd21a48510f209c";
  const userId = "660bbad71dd21a48510f209c";
  // const ChatId = window.localStorage.getItem('chat_id');
  // const your_user_id = window.localStorage.getItem('user_id');
  
  useEffect(() => {
    // 發送 API 請求
    axios.get(`${hostname}/chat/detail/${chatId}`)
      .then(response => {
        // 設置獲取到的數據
        console.log(response.data);
        setChatData(response.data);
        
      })
      .catch(error => {
        console.error('API 請求失敗:', error);
      });
  }, [chatId]);

  return (
    <div >
      {/* 確保 chatData 已經被設置，然後將其傳遞給 ChatRoom 組件 */}
      {chatData && (
        <div className="chat-room-container" >
          {/* 渲染聊天對象的頭像和用戶名 */}
          <div className="chat-header">
            <img src={chatData.chat_to_photo} alt="chat-to-avatar" />
            <p>{chatData.chat_to_username}</p>
          </div>

          {/* 渲染訊息 */}
          {chatData.messages.map(message => (
            <div className='message-container'>
              <div className={`message-box ${message.sender_id === user_id ? "own-message" : ""}`} key={message._id}>
                <p className="message-content">{message.content}</p>
                <p className="timestamp">{new Date(message.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}