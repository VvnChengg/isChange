import React from 'react';
import { useEffect, useState } from 'react';
import { PostContainer } from '../home/home-style';
import Post from '../../components/Post';
import ThreeDotButton from '../../components/Button/ThreeDotButton'; 
import axios from 'axios';



export default function SelfPost() {
    const [posts, setPosts] = useState([]);
    const userId = window.localStorage.getItem('user_id');
    const hostname = process.env.REACT_APP_API_HOSTNAME;
    const token = window.localStorage.getItem('access_token');
    const handleButtonClick = (post) => {
        // popup
        console.log('Button clicked for post:', post._id);
    };
    useEffect(() => {
        axios.get(`${hostname}/post/${userId}`, {
            headers: {
                'Authorization':  `Bearer ${token}`
            }
        })
        .then(response => {
            setPosts(response.data);
            console.log(setPosts)
        })
        .catch(error => {
            console.error('API 請求失敗:', error);
        });
    }, [userId,token]);

    return (
        <PostContainer>
            {posts && Array.isArray(posts) ? (
                posts.map((post, index) => (
                    <div key={`post${index}`}>
                        <Post post={post} />
                        <ThreeDotButton onClick={() => handleButtonClick(post)}></ThreeDotButton>
                    </div>
                ))
            ) : (
                <ThreeDotButton> </ThreeDotButton>
            )}
        </PostContainer>
    )
}