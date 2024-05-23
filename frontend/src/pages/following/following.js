import React, { useState, useEffect } from 'react';
import 
{ 
    Container,
    Title,
    FollowingListContainer, 
    FollowingItem, 
    Avatar, 
    Username, 
    UnfollowButton 
} from './following-style';

import { viewApi } from '../../api/viewApi';
import { useToken } from '../../hooks/useToken';
import { useIntl } from 'react-intl';
import { Spin } from 'antd';


export default function Following(){
    const token = useToken();
    const [following, setFollowing] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const intl = useIntl();
    
      async function getFollowingList(){
        try{
            const data = await viewApi.getFollowingList(token);
            if(data){
                setFollowing(data);
            }
        }catch(err){

        }
        setIsLoading(false);
      }

      async function changeFollowStatus(username) {
        try{
          const data = await viewApi.changeFollowStatus(username, token);
          if(data.message === '成功取消追蹤'){
            getFollowingList();
          }
        }catch(err){

        }
      }

      useEffect(() => {
        if(token){
          getFollowingList();
        }
      }, [token]);

      if(isLoading){
        return <Spin />
      }
      
    
      return (
        <Container>
          <Title>{intl.formatMessage({ id: 'view.followingList' })}</Title>
          <FollowingListContainer>
            {following.map((user) => (
              <FollowingItem key={user._id}>
                <Avatar src={user.photo || '/icons/profile.png'} alt={`${user.username}'s avatar`} onError={(e) => { e.target.onerror = null; e.target.src='/icons/profile.png'; }} />
                <Username>{user.username}</Username>
                <UnfollowButton onClick={() => changeFollowStatus(user.username)}>
                  {intl.formatMessage({ id: 'view.unfollow' })}
                </UnfollowButton>
              </FollowingItem>
            ))}
          </FollowingListContainer>
        </Container>
      );
}