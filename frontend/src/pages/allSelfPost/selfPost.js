// selfPost.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostContainer, HomeContainer} from '../home/home-style';
import Post from '../../components/Post';
import DeleteButton from '../../components/Button/DeleteButton'; 
import axios from 'axios';
import './selfPost.css'
import PopupOnly from './popUPOnly';
import { FormattedMessage } from 'react-intl';
import { useToken } from '../../hooks/useToken';
import CreateAllButton from '../../components/Button/CreateAllButton';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


export default function SelfPost() {
    const [posts, setPosts] = useState([]);
    const userId = window.localStorage.getItem('user_id');
    const hostname = process.env.REACT_APP_API_HOSTNAME;
    //const token = window.localStorage.getItem('access_token');
    const token = useToken()
    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 }); 
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedPostType, setSelectedPostType] = useState(null);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false); 
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    
    const handleButtonClick = (postID,postType,event) => {
        //console.log('Button clicked!');
        setSelectedPost(postID);
        setSelectedPostType(postType);
        setButtonPosition(buttonPosition);
        //console.log(buttonPosition)
        const buttonRect = event.target.getBoundingClientRect();
        const buttonX = buttonRect.left;
        const buttonY = buttonRect.top;
        setButtonPosition({ top: buttonY, left: buttonX });
        setShowConfirmPopup(true); //  顯示確認框
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
            setIsLoading(false);
        })
        .catch(error => {
            console.error('API 请求失败:', error);
            if (error.response && error.response.status === 500) {
                setError(error);
            }
            setIsLoading(false);
        });
    }, [userId, token, hostname]);
    //console.log(posts)

    useEffect(() => {
        //console.log(selectedPost, isModalOpen);
    }, [selectedPost, selectedPostType, showConfirmPopup]);

    if (isLoading) {
        return <Spin />;
    }

    return (
        <>
            {error && error.response && error.response.status === 500 ? (
                // nothing-container 這個取名比較廣泛感覺可以共用在所有沒找到的地方（？
                <div className="nothing-container"> 
                    <p className="self-post-nothing-msg"> <FormattedMessage id='selfpost.nothingMsg' /></p>
                </div>
            ) : (
                <HomeContainer>

                <PostContainer>
                    {posts.map((post, index) => (
                        <div key={`post${index}`} className="self-post-wrapper">
                            <Post post={post} onClick={() => navigate(`/${post.type}/edit/${post._id}`)}/>
                            <DeleteButton onClick={(event) => handleButtonClick(post._id, post.type, event)} />
                        </div>
                    ))}
                </PostContainer>
                </HomeContainer>

            )}
            {showConfirmPopup && ( 
                <PopupOnly 
                    onConfirm={() => {
                        setShowConfirmPopup(false); 
                    }}
                    onCancel={() => setShowConfirmPopup(false)} 
                    postIdToDelete = {selectedPost}
                    postTypeToDelete = {selectedPostType}
                />
            )}
            <CreateAllButton></CreateAllButton>
        </>
    )
}