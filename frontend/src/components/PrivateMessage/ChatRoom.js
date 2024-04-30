// ChatRoom.js

import  React from 'react';
import './ChatRoom.css';

export default function ChatRoom({ chatData, chatPhoto, userId }) {
  let lastDate = null;


  return (
    <div >
      {chatData && (
        <div className='private-message-chat-room-container'>
          <div className='private-message-chat-header' style={{bottom:0}}>
            <img className='private-message-photo' src={chatPhoto.chat_to_photo || '/icons/profile.png'} alt='Avatar' onError={(e) => { e.target.onerror = null; e.target.src='/icons/profile.png'; }}/>
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
                        {message.content && (
                        <p
                            className='private-message-message-content'
                            dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br>') }}
                        ></p>
                    )}
                  </div>
                  <p className='private-message-time'>{formattedHours}:{formattedMinutes}</p>
                </div>
              </div>

            );
          })}
        </div>        

        
      )}

    </div>
  );
}
