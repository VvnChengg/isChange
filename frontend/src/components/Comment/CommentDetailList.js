// CommentDetailList.js

import React, { useState } from 'react';
import './CommentList.css';
import { Button, Input, Space } from 'antd';
import { SendOutlined} from '@ant-design/icons';
import { api } from '../../api';
import { useIntl } from 'react-intl';
import { Spin } from 'antd';
// import DeleteButton from '../../components/Button/DeleteButton'; 

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return formattedDate;
}

function CommentDetailList({ pid, comments }) {
    const intl = useIntl();
    const [content, setContent] = useState('');

    async function onSubmit() {
      try {
        const datetime = formatDate(Date.now());
        const comment = {pid, content, datetime};
        await api.commentPost(comment);
        alert(intl.formatMessage({ id: 'post.commentSuccess' }));
        window.location.reload()
      }
      catch (e) {
        console.log(e);
        alert(intl.formatMessage({ id: 'post.commentFail' }));
      }
    };

    // function onDelete(commentID) {
    //   var r=window.confirm('你真的真的要刪掉他嗎');
    //   if (r==true){
    //     api.deleteUserComment(commentID)
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err));
    //   }
    // };

    if (!comments) {
      return (
      <Spin />
      )};

    return (
      <div className='comment-container'>
        <div className='comment-list-table'>
            {comments.map((comment, index) => (
              <div className='comment-a-comment' key={`comment_${index}`}>
                  <div style={{ display: 'flex'}}>
                    <img src={comment.photo || '/icons/profile.png'} alt='Avatar' onError={(e) => { e.target.onerror = null; e.target.src='/icons/profile.png'; }} style={{ width: '40px', borderRadius: '50%'}} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div className='comment-name' style={{textAlign:'left'}}>{comment.username}</div>
                      <div className='comment-text' style={{textAlign:'left'}}>
                        {comment.comment_content}
                      </div>
                    </div>
                  </div>
                  <div className='comment-time'>{formatDate(comment.comment_created_at)}</div>
                  {/* <DeleteButton onClick={(event) => onDelete(post._id, post.type, event)} /> */}
              </div>
            ))}
            { comments && comments.length === 0 ?
              <p> {intl.formatMessage({ id: 'post.noComment' })} </p> : <p />
            }
            <div style={{display: 'flex', width: '100%'}}>
              <Input.TextArea
                autoSize={{ minRows: 1, maxRows: 3 }} // 自動調整大小，最多變為三行
                onChange={e => setContent(e.target.value)}
                value={content}
                style={{ borderRadius: 0 }}
              />
              <Button type="primary" icon={<SendOutlined />} style={{ borderRadius:0}} onClick={() => onSubmit()} />
            </div>
        </div>
      </div>
    );
}

export default CommentDetailList;
