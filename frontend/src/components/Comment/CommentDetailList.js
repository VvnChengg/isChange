// CommentDetailList.js

import React, { useState } from 'react';
import './CommentList.css';
import { FormattedMessage } from 'react-intl';
import { Button, Input, Space } from 'antd';
import { SendOutlined} from '@ant-design/icons';
import { api } from '../../api';
import { useIntl } from 'react-intl';
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

function CommentDetailList({ commentInfo }) {
    const pID = commentInfo.pid;
    const title = commentInfo.postTitle;
    const comments = commentInfo.comments;
    const intl = useIntl();
    const [content, setContent] = useState('');

    async function onSubmit() {
      try {
        const datetime = formatDate(Date.now());
        const comment = {pID, content, datetime};
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
      <p> Loading... </p>
      )};

    return (
      <div className='comment-container'>
        <h1 className='comment-title' style={{display:'flex', alignItems: 'center'}}> 
          {/* <AiOutlineMail style={{ marginRight: '1vh', verticalAlign: 'middle' }}/>  */}
          {title}
        </h1>
        <table className='comment-list-table'>
            {comments.map((comment, index) => (
              <React.Fragment key={`comment_${index}`}>
                <tbody className='comment-a-comment' >
                <tr>
                  <td rowSpan={2} style={{ width: '80px' }}>
                    <img src={comment.photo||'/icons/profile.png'} alt='Avatar' onError={(e) => { e.target.onerror = null; e.target.src='/icons/profile.png'; }} style={{ width: '100%', borderRadius: '50%'}} />
                  </td>
                  <td colSpan={1} className='comment-name' style={{textAlign:'left'}}>{comment.username}</td>
                  <td colSpan={2} className='comment-time'>{formatDate(comment.comment_created_at)}</td>
                </tr>
                <tr className='comment-bottom'>
                  <td  className='comment-text' colSpan={2} style={{textAlign:'left'}}>
                      <span>{comment.comment_content}</span>
                  </td>
                  {/* <DeleteButton onClick={(event) => onDelete(post._id, post.type, event)} /> */}
                </tr>
                </tbody>
              </React.Fragment>
            ))}
            { comments && comments.length === 0 ?
              <p> {intl.formatMessage({ id: 'post.noComment' })} </p> : <p></p>
            }
            <Input.TextArea
              autoSize={{ minRows: 1, maxRows: 3 }} // 自動調整大小，最多變為三行
              onChange={e => setContent(e.target.value)}
              value={content}
              style={{ width: '90%' , borderRadius:0}}
            />
            <Button type="primary" icon={<SendOutlined />} style={{ borderRadius:0}} onClick={() => onSubmit()}></Button>
        </table>
      </div>
    );
}

export default CommentDetailList;
