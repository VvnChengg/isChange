// selfPost.js
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostContainer, HomeContainer,  NoContent} from '../home/home-style';
import DeleteButton from '../../components/Button/DeleteButton'; 
import axios from 'axios';
import './selfPost.css'
import PopupOnly from './popUPOnly';
import { FormattedMessage } from 'react-intl';
import { useToken } from '../../hooks/useToken';
import CreateAllButton from '../../components/Button/CreateAllButton';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
// coverPhoto
import { api } from '../../api';
import { PostWrapper } from '../../components/Post/Post-style'

const Post = lazy(() => import('../../components/Post'));
const PostPhoto = lazy(() => import('../../components/Post/PostPhoto'));




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

    // coverphoto
    const [images, setImages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [remainingImageIds, setRemainingImageIds] = useState([]);

    
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


    // coverphoto
    useEffect(() => {
        const ids = posts.map(post => post._id);
        setRemainingImageIds(ids);
    }, [posts]);

    // 在加載圖片時，只操作 remainingImageIds：
    useEffect(() => {
        if (remainingImageIds.length > 0 && !isLoading && hasMore) {
            setIsLoading(true);
            const nextBatchIds = remainingImageIds
                .slice(0, 5); // 每次只取五個圖片 id
            api.getImage(nextBatchIds)
            .then(res => {
                setImages(prevImages => [...prevImages, ...res]); // 合併新返回的圖片數據
                setIsLoading(false); // 加載結束

                // 更新 remainingImageIds，刪除已加載的圖片 id
                setRemainingImageIds(prevIds => prevIds.slice(5));
                
                if (res.length === 0 || remainingImageIds.length <= 5) {
                    setHasMore(false);
                }
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
        }
    }, [remainingImageIds, isLoading, hasMore]);
    

    function getCoverPhotoByPid(pid) {
        const item = images.find(element => element.pid === pid);
        return item ? item.coverPhoto : null;
    }

    // if (isLoading) {
    //     return <Spin />;
    // }

    return (
        <>
            {error && error.response && error.response.status === 500 && posts.length === 0 ? (
                // nothing-container 這個取名比較廣泛感覺可以共用在所有沒找到的地方（？
                <NoContent>
                    <p className="self-post-nothing-msg"> <FormattedMessage id='selfpost.nothingMsg' /></p>
                </NoContent>
            ) : (
                <HomeContainer>
                    <PostContainer>
                        {posts.map((post, index) => (
                            <React.Fragment key={post._id}>
                                <div className="self-post-wrapper" >
                                    <PostWrapper showDivider={index !== posts.length - 1} onClick={() => navigate(`/${post.type}/edit/${post._id}`)}>
                                        <Suspense fallback={<div>Loading post...</div>}>
                                            <Post post={post} showDivider={index !== posts.length - 1} />
                                        </Suspense>
                                        <Suspense fallback={<div>Loading photo...</div>}>
                                            <PostPhoto src={getCoverPhotoByPid(post._id)} />
                                        </Suspense>
                                    </PostWrapper>
                                    <DeleteButton onClick={(event) => handleButtonClick(post._id, post.type, event)} />
                                </div>
                            </React.Fragment>
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
        </>
    )
}