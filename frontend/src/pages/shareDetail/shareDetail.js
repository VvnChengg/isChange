import React, {useEffect, useState} from 'react';
import './shareDetail-style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api';
import { viewApi } from '../../api/viewApi';
import axios from 'axios';
import { useToken } from '../../hooks/useToken';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import {
  DetailContainer,
  DetailButtonContainer
} from './shareDetail-style';

import PostDetail from '../../components/PostDetail';
import Button from '../../components/Button';
import { Spin } from 'antd';

export default function MyComponent() {
  const intl = useIntl();
  const navigate = useNavigate();
  // const [username, setUsername] = useState('');
  // const [school, setSchool] = useState('');
  // const [headshot, setHeadshot] = useState('');

  const token = localStorage.getItem('access_token');
  const user_id = localStorage.getItem('user_id');
  const expiryTime = localStorage.getItem('expiry_time');
  const { pid } = useParams();

  // 這塊是收藏文章用的
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // const getMemberInfo = async () => {
  //   const memberInfo = await viewApi.getMember(token);
  //   setUsername(memberInfo.username);
  //   setSchool(memberInfo.exchange_school_name);
  //   setHeadshot(memberInfo.photo);
  // }

  // useEffect(() => {
  //   if(token){
  //       getMemberInfo();
  //   }
  // }, [token]);

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
    const postInfo = await api.getPostDetail(pid);
    setPost(postInfo.item);
    setIsLoading(false);
  }

  useEffect(() => {
      getInfo();
  }, []);


  function contact() {
    // api: send msg
    if(post.creator_username){
        navigate(`/member/${post.creator_username}`);
    }
  }

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
