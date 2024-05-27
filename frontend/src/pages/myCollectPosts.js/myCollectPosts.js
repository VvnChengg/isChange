import React, { useEffect, useState } from 'react';
import Post from '../../components/Post';
import { useToken } from '../../hooks/useToken';
import { collectApi } from '../../api/collectAPi';
import { Spin } from 'antd';
import {
    HomeContainer,
    PostContainer,
    SpinContainer,
    NoContent,
} from '../home/home-style';
import { PostWrapper } from '../../components/Post/Post-style'
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';


export default function MyCollectPosts() {
    const token = useToken();
    const user_id = localStorage.getItem('user_id');

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const intl = useIntl();

    const navigate = useNavigate();

    useEffect(() => {
        // api: get favorite post
        if(token && user_id){
            handleFavoritePost()
        }
    }, [token, user_id])

    async function handleFavoritePost(){
        // api: get favorite post
        try{
            const data = await collectApi.getMyCollectPostList(user_id, token);

            if(data.success){
                setPosts(data.result);
            }else{

            }
        }catch(err){
            setPosts([]);
            toast.error(intl.formatMessage('collect.getFailed'));
        }
        setIsLoading(false);
    }

    if(isLoading){
        return (
            <SpinContainer>
                <Spin/>
            </SpinContainer>
        )
    }

    return (
        <HomeContainer>
            <PostContainer>
            {posts.length === 0 ?
                <NoContent>
                    {intl.formatMessage({ id: 'home.noContent' })}
                </NoContent>
                :posts.map((post, index) => (
                    <PostWrapper
                        showDivider={index !== posts.length - 1}
                        onClick={() => navigate(`/${post.type}/detail/${post._id}`)}
                        key={post._id}
                    >
                        <Post
                            post={post}
                            showDivider={index !== posts.length - 1}
                        />
                    </PostWrapper>
                ))
            }
            </PostContainer>
        </HomeContainer>
    )
}