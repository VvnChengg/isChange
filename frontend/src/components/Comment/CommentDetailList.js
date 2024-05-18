// CommentDetailList.js 純框架

import React, { useState } from 'react';
import { AiOutlineMail } from 'https://esm.sh/react-icons/ai';
import './CommentList.css';
import { FormattedMessage } from 'react-intl';
// import ChatRoomInput from '../../components/Comment/ChatRoomInput';
import { Button, Input, Space } from 'antd';
import { CameraOutlined ,SendOutlined} from '@ant-design/icons';
import { api } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
// import { text } from 'express';

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return formattedDate;
}

function CommentDetailList({ commentInfo }) {
    const pID = commentInfo.pid;
    const rooms = commentInfo.comments;
    const intl = useIntl();
    let navigate = useNavigate();
    
    const [content, setContent] = useState('');

    async function onSubmit() {
      try {
        const datetime = formatDate(Date.now());
        const comment = {pID, content, datetime};
        console.log('comment');
        console.log(comment);
        const data = await api.commentPost(comment);
        if (data.success) {
          alert(intl.formatMessage({ id: 'post.createSuccess' }));
          navigate('/post/published');
        } else {
          alert(intl.formatMessage({ id: 'post.createFail' }));
        }
      }
      catch (e) {
        console.log(e);
        alert(intl.formatMessage({ id: 'post.createFail' }));
      }
    }

    if (!rooms) {
      return (
      <p> Loading... </p>
      )};

    // if ( rooms && rooms.length === 0) {
    //   return (
    //   <p> No Comment Now!! </p>)
    //   }; 

    return (
      <div className='private-message-container'>
        <h1 className='private-message-chat-room-title' style={{display:'flex', alignItems: 'center'}}> 
          <AiOutlineMail style={{ marginRight: '1vh', verticalAlign: 'middle' }}/> 
          <FormattedMessage id='msg.chatRoomTitle' />
        </h1>
        <table className='private-message-chat-list-table'>
            {rooms.map((room, index) => (
              <React.Fragment key={`room_${index}`}>
                <tbody className='private-message-a-chat' >
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
                    {room.stranger === true ? <span style={{ color: 'red' }}>
                    <FormattedMessage id='msg.stranger' />
                    </span> : null}
                  </td>
                </tr>
                </tbody>
              </React.Fragment>
            ))}
            <Input.TextArea
              autoSize={{ minRows: 1, maxRows: 3 }} // 自動調整大小，最多變為三行
              onChange={e => setContent(e.target.value)}
              value={content}
              // onKeyDown={handleKeyDown}
              // rows={inputRows}
              // onResize={handleResize}
              style={{ width: '90%' , borderRadius:0}}
            />
            <Button type="primary" icon={<SendOutlined />} style={{ width: '10%' , borderRadius:0}} onClick={() => onSubmit()}></Button>
        </table>
      </div>
    );
}

export default CommentDetailList;
