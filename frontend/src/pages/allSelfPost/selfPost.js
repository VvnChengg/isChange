// selfPost.js
import React, { useEffect, useState } from 'react';
import { PostContainer } from '../home/home-style';
import Post from '../../components/Post';
import ThreeDotButton from '../../components/Button/ThreeDotButton'; 
import ThreeDotButtonPopup from '../../components/Button/ThreeDotButtonPopup';
import axios from 'axios';
import './selfPost.css'



export default function SelfPost() {
    const [posts, setPosts] = useState([]);
    const userId = window.localStorage.getItem('user_id');
    const hostname = process.env.REACT_APP_API_HOSTNAME;
    const token = window.localStorage.getItem('access_token');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 }); 
    const [selectedPost, setSelectedPost] = useState(null);
    

    
    const handleButtonClick = (postID,event) => {
        //console.log('Button clicked!');
        setSelectedPost(postID);
        setIsModalOpen(true);
        setButtonPosition(buttonPosition);
        //console.log(buttonPosition)
        const buttonRect = event.target.getBoundingClientRect();
        const buttonX = buttonRect.left;
        const buttonY = buttonRect.top;
        setButtonPosition({ top: buttonY, left: buttonX });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleEditPost = () => {
        console.log('Editing post...');
    };

    const handleDeletePost = () => {
        console.log('Deleting post...');
    };

    useEffect(() => {
        axios.get(`${hostname}/post/${userId}`, {
            headers: {
                'Authorization':  `Bearer ${token}`
            }
        })
        .then(response => {
            setPosts(response.data.result);
            //console.log('已更新:', response.data);
        })
        .catch(error => {
            console.error('API 請求失敗:', error);
        });
    }, [userId, token, hostname]);
    //console.log(posts)

    useEffect(() => {
        //console.log(selectedPost, isModalOpen);
    }, [selectedPost, isModalOpen]);

    return (
        <PostContainer>
            {Array.isArray(posts) && posts.length > 0 ? (
                posts?.map((post, index) => (
                    <div key={`post${index}`} className="self-post-wrapper">
                        <Post post={post} />
                        <ThreeDotButton onClick={(event) => handleButtonClick(post._id, event)} ></ThreeDotButton> 
                    </div>
                ))
            ) : (
                <p>NONE!!</p>
            )}
            {isModalOpen && (
                <ThreeDotButtonPopup  
                    isOpen={isModalOpen} 
                    onClose={handleCloseModal} 
                    onEdit={handleEditPost} 
                    onDelete={handleDeletePost} 
                    buttonPosition={buttonPosition} 
                />
            )}
        </PostContainer>
    )
}