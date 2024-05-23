// 框架與api串接

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentDetailList from './CommentDetailList';
import { useToken } from '../../hooks/useToken';
import { api } from '../../api';
import { useParams } from 'react-router-dom';

function CommentList() {
  const [comments, setComments] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const token = useToken();
  //const userId = window.localStorage.getItem('user_id');
  const { pid } = useParams();

  const getInfo = async () => {
    const postInfo = await api.getPostDetail(pid);
    setPostTitle(postInfo.item.title);
    setComments(postInfo.item.comment_list);
  }

  useEffect(() => {
      getInfo();
  }, []);

  const commentInfo = {pid, postTitle, comments};

  return (
    <div>
      <div className='chatRoomListContainer'>
        <CommentDetailList commentInfo={commentInfo} />
      </div>
    </div>
  );
}

export default CommentList;
