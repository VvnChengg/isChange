import React from 'react';
import { useState, useEffect } from 'react';
import  './PrivateList.css';
import axios from 'axios';
import { AiOutlineMail } from "https://esm.sh/react-icons/ai";
import { useNavigate } from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // 將月份和日期補零，並以指定格式拼接
  const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return formattedDate;
}


// 聊天室列表
function ChatRoomList({ rooms, onSelectRoom }) {
    const navigate = useNavigate();
    
    const handleRoomClick = (chatid) => {
      navigate("/chatroom/"+chatid);
    };


    return (
      <div className="private-message-container">
        <h1 className="private-message-chat-room-title" style={{display:'flex', alignItems: 'center'}}> 
          <AiOutlineMail style={{ marginRight: "1vh", verticalAlign: "middle" }}/> 聊天室
        </h1>
        <table className="private-message-chat-list-table">
            {rooms.map((room, index) => (
              <React.Fragment key={`room_${index}`}>
                <tbody className='private-message-a-chat' onClick={() => handleRoomClick(room.chat_id)}>
                <tr>
                  <td rowSpan={2} style={{ width: '20%' }}>
                    <img src={room.chat_to_photo|| "/icons/profile.png"} alt="Avatar" onError={(e) => { e.target.onerror = null; e.target.src="/icons/profile.png"; }} style={{ width: '100%' }} />
                  </td>
                  <td colSpan={1} className="private-message-chat-name" style={{textAlign:'left'}}>{room.chat_to_username}</td>
                  <td colSpan={2} className="private-message-chat-time">{formatDate(room.last_update)}</td>
                </tr>
                <tr className='private-message-bottom'>
                  <td  className="private-message-chat-text" colSpan={2} style={{textAlign:'left'}}>
                    {room.last_message ? 
                      (<span>{room.last_message}</span>) 
                      : 
                      <span style={{ color: 'red' }}>使用者尚未輸入信息</span>
                    }
                  </td>
                  <td colSpan={1} className="private-message-chat-status">
                    {room.stranger === true ? <span style={{ color: 'red' }}>陌生</span> : null}
                  </td>
                </tr>
                </tbody>
              </React.Fragment>
            ))}
        </table>
      </div>
    );
  };


// 主應用程序
function PrivateList() {
  const [rooms, setRooms] = useState([]);
  //const hostname = 'http://localhost:3000/api';
  const hostname = process.env.REACT_APP_API_HOSTNAME;
  //console.log(hostname)
  useEffect(() => {
    const userId = window.localStorage.getItem('user_id');
    const token = window.localStorage.getItem('access_token');
    // console.log(userId, token);
    // const userId ='660bbad71dd21a48510f209c'
    axios.get(`${hostname}/chat/chatlist`, {headers: {
      'Authorization':  `Bearer ${token}`
  }})
    .then(response => {
      // 數據取得
      console.log(response.data);
      setRooms(response.data.chats);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);
  return (
    
    <div>
      <div className="chatRoomListContainer">
        <ChatRoomList rooms={rooms} />
      </div>
    </div>
     
  );
  };

export default PrivateList;