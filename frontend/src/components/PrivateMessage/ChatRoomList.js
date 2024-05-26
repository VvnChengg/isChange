// ChatRoomList.js 純框架

import React , {useState} from 'react';
import { AiOutlineMail } from 'https://esm.sh/react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './PrivateList.css';
import { FormattedMessage } from 'react-intl';
import { Spin } from 'antd';
import Popup from '../StartPrivate/Popup';

import {
  ChatRoomWrapper,
  ChatRoomContainer,
  ChatRoomAvatar,
  ChatRoomContent,
  ChatRoomRow,
} from './ChatRoomList-style';


function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return formattedDate;
}

function ChatRoomList({ rooms }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [popupData, setPopupData] = useState(null);
    const userId = window.localStorage.getItem('user_id');

    const togglePopup = () => {
      setIsOpen(!isOpen);
    };
  
    const handleRoomClick = (roomdata) => {
      const chatid = roomdata.chat_id;
      const stranger = roomdata.stranger;
      //console.log(roomdata);
      
      
      if (stranger && roomdata.first_person !== userId ) {
        setPopupData(roomdata); 
        setIsOpen(true); 
      } else {
        navigate('/chatroom/' + chatid);
      }
    };

    if (rooms === undefined) {
      return( 
        <Spin />)
    } 
    else if (rooms === null) {
      return (
      <div className="private-message-container"> 
        <p className="self-post-nothing-msg"> <FormattedMessage id='msg.nothingMsg' /></p>
      </div>
      )
    }
    else {
    return (
      <div className='private-message-container'>
        <h1 className='private-message-chat-room-title' style={{display:'flex', alignItems: 'center'}}> 
          <AiOutlineMail style={{ marginRight: '1vh', verticalAlign: 'middle' }}/> 
          <FormattedMessage id='msg.chatRoomTitle' />
        </h1>
        <ChatRoomWrapper>
            {rooms.map((room, index) => (
              <ChatRoomContainer
                key={`room_${index}`}
                onClick={() => handleRoomClick(room)}
                showBottom={index !== rooms.length - 1}
              >
                <ChatRoomAvatar>
                  <img
                    src={room.chat_to_photo || '/icons/profile.png'}
                    alt='Avatar'
                    onError={(e) => { e.target.onerror = null; e.target.src='/icons/profile.png'; }}
                  />
                </ChatRoomAvatar>
                <ChatRoomContent>
                  <ChatRoomRow>
                    <div className='private-message-chat-name' style={{textAlign:'left'}}>{room.chat_to_username}</div>
                    <div className='private-message-chat-time'>{formatDate(room.last_update)}</div>
                  </ChatRoomRow>
                  <ChatRoomRow>
                    {room.last_message ? 
                      <div>{room.last_message}</div> : 
                      <div style={{ color: 'red' }}>
                        <FormattedMessage id='msg.userNotEntered' />
                      </div>
                    }
                    <div className='private-message-chat-status'>
                      {room.stranger === true ?
                        <div style={{ color: 'red' }}>
                          <FormattedMessage id='msg.stranger' />
                        </div> :
                        (room.unread_cnt === 0 ?
                          null :
                          <div className='private-message-chat-unread'>{room.unread_cnt}</div>
                        )
                      }
                    </div>
                  </ChatRoomRow>
                </ChatRoomContent>
              </ChatRoomContainer>
            ))}
        </ChatRoomWrapper>
        {isOpen && popupData && (
        <Popup
          other_id={popupData.first_person}
          other_name={popupData.chat_to_username}
          isOpen={isOpen}
          onClose={togglePopup}
          direction='Accept'
          chatid={popupData.chat_id}
        />
        )}
      </div>
    );
    } 
};

export default ChatRoomList;
