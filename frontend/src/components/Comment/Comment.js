import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { Button, Input, Spin } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import {
  CommentContainer,
  CommentWrapper,
  CommentLeft,
  CommentName,
  CommentContent,
  CommentTime
} from './Comment-style';

import { api } from '../../api';

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

export default function Comment({ pid, comments, user_id, token }) {
    const intl = useIntl();
    const [content, setContent] = useState('');

    async function onSubmit() {
      if(token && user_id) {
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
      } else{
        toast.error(`${intl.formatMessage({id: 'token.pleaseLogIn'})}`);
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
      <CommentContainer>
        {comments.map((comment, index) => (
          <CommentWrapper key={`comment_${index}`}>
            <CommentLeft>
              <img src={comment.photo || '/icons/profile.png'} alt='Avatar' onError={(e) => { e.target.onerror = null; e.target.src='/icons/profile.png'; }} style={{ width: '40px', borderRadius: '50%'}} />
              <CommentName>{comment.username}</CommentName>
              <CommentContent>
                {comment.comment_content}
              </CommentContent>
            </CommentLeft>
            <CommentTime>{formatDate(comment.comment_created_at)}</CommentTime>
            {/* <DeleteButton onClick={(event) => onDelete(post._id, post.type, event)} /> */}
          </CommentWrapper>
        ))}
        {comments && comments.length === 0 ?
          <p> {intl.formatMessage({ id: 'post.noComment' })} </p> : <p />
        }
        <div style={{ display: 'flex', width: '100%' }}>
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 3 }} // 自動調整大小，最多變為三行
            onChange={e => setContent(e.target.value)}
            value={content}
            style={{ borderRadius: 0 }}
          />
          <Button type="primary" icon={<SendOutlined />} style={{ borderRadius: 0 }} onClick={() => onSubmit()} />
        </div>
      </CommentContainer>
    );
}