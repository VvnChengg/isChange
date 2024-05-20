// ChatRoomList.js 純框架

import React , {useState} from 'react';
import { AiOutlineMail } from 'https://esm.sh/react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './PrivateList.css';
import { FormattedMessage } from 'react-intl';
import { Spin } from 'antd';
import Popup from '../StartPrivate/Popup';


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
      console.log(roomdata);
      
      
      if (stranger && roomdata.first_person !== userId ) {
        setPopupData(roomdata); 
        setIsOpen(true); 
      } else {
        navigate('/chatroom/' + chatid);
      }
    };



    if (!rooms) {
      return <Spin />;
    };

    if ( rooms && rooms.length === 0) {
      return (
      <p> No Chat Now!! </p>)
      }; 

    return (
      <div className='private-message-container'>
        <h1 className='private-message-chat-room-title' style={{display:'flex', alignItems: 'center'}}> 
          <AiOutlineMail style={{ marginRight: '1vh', verticalAlign: 'middle' }}/> 
          <FormattedMessage id='msg.chatRoomTitle' />
        </h1>
        <table className='private-message-chat-list-table'>
            {rooms.map((room, index) => (
              <React.Fragment key={`room_${index}`}>
                <tbody className='private-message-a-chat' onClick={() => handleRoomClick(room)}>
                <tr>
                  <td rowSpan={2} style={{ width: '80px' }}>
                    <img src={room.chat_to_photo||'/icons/profile.png'} alt='Avatar' onError={(e) => { e.target.onerror = null; e.target.src='/icons/profile.png'; }} style={{ width: '100%', borderRadius: '50%'}} />
                  </td>
                  <td colSpan={1} className='private-message-chat-name' style={{textAlign:'left'}}>{room.chat_to_username}</td>
                  <td colSpan={2} className='private-message-chat-time'>{formatDate(room.last_update)}</td>
                </tr>
                <tr className='private-message-bottom'>
                  <td  className='private-message-chat-text' colSpan={2} style={{textAlign:'left'}}>
                    {room.last_message ? 
                      (<span>{room.last_message}</span>) 
                      : 
                      <span style={{ color: 'red' }}>
                        <FormattedMessage id='msg.userNotEntered' />
                        </span>
                    }
                  </td>
                  <td colSpan={1} className='private-message-chat-status'>
                    {room.stranger === true ?
                    <span style={{ color: 'red' }}>
                      <FormattedMessage id='msg.stranger' />
                    </span> :
                    (room.unread_cnt === 0 ? null : <span className='private-message-chat-unread'>{room.unread_cnt}</span>)
                    }
                  </td>
                </tr>
                </tbody>
              </React.Fragment>
            ))}
        </table>
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

export default ChatRoomList;
