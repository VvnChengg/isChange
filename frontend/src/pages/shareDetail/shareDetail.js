import React, {useEffect, useState} from 'react';
import './shareDetail-style.css';
// import { AiOutlineMail } from 'https://esm.sh/react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api';
import { viewApi } from '../../api/viewApi';
import axios from 'axios';
import { useToken } from '../../hooks/useToken';
// import LikeButton from "./likeButton";
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import {
  DetailContainer,
  DetailButtonContainer
} from './shareDetail-style';

import PostDetail from '../../components/PostDetail';
import Button from '../../components/Button';

import CollectPost from '../../components/CollectPost/CollectPost';
import { Spin } from 'antd';

export default function MyComponent() {
  const intl = useIntl();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [school, setSchool] = useState('');
  const [headshot, setHeadshot] = useState('');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState('');
  const [likes, setLikes] = useState('');
  const [isLiked, setIsLiked] = useState('');

  const token = localStorage.getItem('access_token');
  const user_id = localStorage.getItem('user_id');
  const expiryTime = localStorage.getItem('expiry_time');
  const { pid } = useParams();

  // 這塊是收藏文章用的
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getMemberInfo = async () => {
    const memberInfo = await viewApi.getMember(token);
    setUsername(memberInfo.username);
    setSchool(memberInfo.exchange_school_name);
    setHeadshot(memberInfo.photo);
  }

  useEffect(() => {
    if(token){
        getMemberInfo();
    }
  }, [token]);

  // 判斷 token 是否過期
  useEffect(() => {
    const now = new Date();
    if(token && user_id && expiryTime){
        if (now.getTime() > Number(expiryTime)) {
            toast.error(intl.formatMessage({ id: 'token.Expiry' }));
            localStorage.clear();
            return
        }    
    }
}, [expiryTime, token, user_id]);


  const getInfo = async () => {
    // const pid = "6617996b1067c62b7d704652";
// const pid = "6617996b106";  // 文章ID格式錯誤
// const pid = "6617996b1067c62b7d704650"; // 尚未發布文章
    const postInfo = await api.getPostDetail(pid);
    setTitle(postInfo.item.title);
    console.log(postInfo);
    setContent(postInfo.item.content);
    setPhoto(postInfo.item.coverPhoto);
    setLikes(postInfo.item.like_count);
    setIsLiked(postInfo.item.is_liked);

    // 這塊是收藏文章用的
    setPost(postInfo.item);

    setIsLoading(false);
  }

  useEffect(() => {
      getInfo();
  }, []);


  function contact() {
    // console.log('contact');
    // api: send msg
    if(post.creator_username){
        navigate(`/member/${post.creator_username}`);
    }
  }

  // const post = {
  //   title,
  //   content,
  //   photo,
  //   likes,
  //   isLiked,
  //   pid,
  // }

  if(isLoading){
    return <Spin />;
  }

  return (
      <DetailContainer>
          <PostDetail post={post} />
          <DetailButtonContainer>
              <Button
                  text={intl.formatMessage({ id: 'back' })}
                  secondary={true}
                  onClick={() => window.history.back()}
              />
              {user_id !== post.creator_id && post.creator_username &&
                  <Button
                      text={intl.formatMessage({ id: 'tour.message' })}
                      onClick={() => contact()}
                  />
              }
          </DetailButtonContainer>
      </DetailContainer>
  );
}
