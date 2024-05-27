import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  FollowingListContainer,
  FollowingItem,
  Avatar,
  Username,
  UnfollowButton,
  DisabledButton
} from './following-style';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { viewApi } from '../../api/viewApi';
import { useToken } from '../../hooks/useToken';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';


export default function Following() {
  const token = useToken();
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const intl = useIntl();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState('');

  async function getFollowingList() {
    try {
      const data = await viewApi.getFollowingList(token);
      if (data) {
        setFollowing(data);
      }
    } catch (err) {

    }
    setIsLoading(false);
  }

  async function changeFollowStatus(username) {
    setIsSubmitting(username);
    try {
      const data = await viewApi.changeFollowStatus(username, token);
      if (data.message === '成功取消追蹤') {
        getFollowingList();
      }
    } catch (err) {

    }
    setIsSubmitting('');
  }

  useEffect(() => {
    if (token) {
      getFollowingList();
    }
  }, [token]);

  if (isLoading) {
    return <Spin />
  }


  return (
    <Container>
      <Title>{intl.formatMessage({ id: 'view.followingList' })}</Title>
      <FollowingListContainer>
        {following.map((user) => (
          <FollowingItem key={user._id}>
            <div onClick={() => navigate(`/member/${user.username}`)}>
              <Avatar src={user.photo || '/icons/profile.png'} alt={`${user.username}'s avatar`} onError={(e) => { e.target.onerror = null; e.target.src = '/icons/profile.png'; }} />
              <Username>{user.username}</Username>
            </div>
            <UnfollowButton
              onClick={() => changeFollowStatus(user.username)}
              isLoading={isSubmitting === user.username}
            >
              {
                isSubmitting === user.username ?
                <div>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} />
                {intl.formatMessage({ id: 'loading' })}
                </div> 
                : intl.formatMessage({ id: 'view.unfollow' })
              }

            </UnfollowButton>
          </FollowingItem>

        ))}
      </FollowingListContainer>
    </Container>
  );
}