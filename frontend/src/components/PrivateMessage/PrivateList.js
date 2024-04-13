import React from 'react';
import { useState, useEffect } from 'react';
import './PrivateList.css';
import axios from 'axios';
import { AiOutlineMail } from "https://esm.sh/react-icons/ai";



// 聊天室列表
function ChatRoomList({ rooms, onSelectRoom }) {
    return (
      <div className="container">
        <h1 className="chat-room-title" style={{display:'flex', alignItems: 'center'}}> 
          <AiOutlineMail style={{ marginRight: "8px", verticalAlign: "middle" }}/> 聊天室
        </h1>
        <table className="chat-list-table">
          <tbody>
            {rooms.map(room => (
              <React.Fragment key={room._id}>
                <tr >
                  <td rowSpan={2}>
                    <img src={room.avatar} alt="Avatar" style={{ width: '100px' }} />
                  </td>
                  <td colSpan={1} className="chat-name" style={{textAlign:'left'}}>{room.second_person}</td>
                  <td colSpan={2} className="chat-time">{room.last_update}</td>
                </tr>
                <tr className='a-chat'>
                  <td colSpan={2} style={{textAlign:'left'}}>
                    {room.last_message.length > 15 ? room.last_message.slice(0, 12) + '...' : room.last_message}
                  </td>
                  <td colSpan={1} className="chat-status">
                    {room.stranger === true ? <span style={{ color: 'red' }}>陌生</span> : null}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
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