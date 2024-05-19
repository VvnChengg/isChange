// ChatRoom.js

import React from 'react';
import './ChatRoom.css';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; 

export default function ChatRoom({ chatData, chatPhoto, userId, handleDownload }) {
  let lastDate = null;
    

  return (
    <div>
      {chatData && (
        <div className='private-message-chat-room-container'>
          <div className='private-message-chat-header' style={{ bottom: 0 }}>
            <img className='private-message-photo' src={chatPhoto.chat_to_photo || '/icons/profile.png'} alt='Avatar' onError={(e) => { e.target.onerror = null; e.target.src='/icons/profile.png'; }} style={{ borderRadius: '50%' }}/>
            <p className='private-message-name'>{chatPhoto.chat_to_username}</p>
          </div>
        



          {chatData.map(message => {
            const messageDate = new Date(message.timestamp);
            const formattedDate = `${messageDate.getFullYear()}/${(messageDate.getMonth() + 1).toString().padStart(2, '0')}/${messageDate.getDate().toString().padStart(2, '0')}`;
            const formattedHours = messageDate.getHours().toString().padStart(2, '0');
            const formattedMinutes = messageDate.getMinutes().toString().padStart(2, '0');
            const showDate = formattedDate !== lastDate;
            lastDate = formattedDate;


            return (
              <div className='private-message-message-container' key={message._id}>
                {showDate && (
                  <div className='private-message-date-container'>
                    <p className='private-message-date'>{formattedDate}</p>
                  </div>
                )}
                <div className={`private-message-message-box ${message.sender_id === userId ? 'private-message-own-message' : ''}`}>
                  <div className={`private-message-message ${message.sender_id === userId ? 'private-message-own' : ''}`}>
                    {message.message_type === 'text' ? (
                      <p
                        className='private-message-message-content'
                        dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br>') }}
                      ></p>
                    ) : message.message_type === 'pic' ? (
                      <div>
                        <LazyLoadImage
                          src={message.photo}
                          alt='pic'
                          className='private-message-pic-content'
                          width= 'auto'
                        />
                      </div>
                    ) : null}
                  </div>
                  <p className='private-message-time'>{formattedHours}:{formattedMinutes}</p>
                  <div className='private-message-download'>
                    {message.message_type === 'pic' ? (
                      <div>
                        <Button onClick={() => handleDownload(message.photo)} icon={<DownloadOutlined />} />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
