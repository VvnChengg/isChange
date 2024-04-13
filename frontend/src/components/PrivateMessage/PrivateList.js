import React from 'react';
import { useState, useEffect } from 'react';
import './PrivateList.css';
import axios from 'axios';
import { AiOutlineMail } from "https://esm.sh/react-icons/ai";
import ChatRoom from './ChatRoom';



// 聊天室列表
function ChatRoomList({ rooms, onSelectRoom }) {
    const handleRoomClick = (roomid) => {
      return (
        <div><ChatRoom chatId={roomid}/></div>
    )
    };


    return (
      <div className="container">
        <h1 className="chat-room-title" style={{display:'flex', alignItems: 'center'}}> 
          <AiOutlineMail style={{ marginRight: "8px", verticalAlign: "middle" }}/> 聊天室
        </h1>
        <table className="chat-list-table">
            {rooms.map(room => (
              <React.Fragment key={room._id}>
                <tbody className='a-chat' onClick={() => handleRoomClick(room._id)}>
                <tr>
                  <td rowSpan={2}>
                    <img src={room.chat_to_photo} alt="Avatar" style={{ width: '100px' }} />
                  </td>
                  <td colSpan={1} className="chat-name" style={{textAlign:'left'}}>{room.chat_to_username}</td>
                  <td colSpan={2} className="chat-time">{room.last_update}</td>
                </tr>
                <tr className='bottom'>
                  <td colSpan={2} style={{textAlign:'left'}}>
                    {room.last_message ? 
                      (room.last_message.length > 15 ? 
                        <span>{room.last_message.slice(0, 12)}...</span> 
                        : 
                        <span>{room.last_message}</span>
                      ) 
                      : 
                      <span style={{ color: 'red' }}>該使用者尚未輸入信息</span>
                    }
                  </td>
                  <td colSpan={1} className="chat-status">
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
  const hostname = 'http://localhost:3000/api';


  useEffect(() => {
    const userId ='660bbad71dd21a48510f209c'
    axios.get(`${hostname}/chat/chatlist`, {
      params: {
        userId: userId
      }
    })
    .then(response => {
      // 设置获取到的数据
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