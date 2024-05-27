import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useToken } from '../../hooks/useToken';
import { collectApi } from '../../api/collectAPi';
import { api } from '../../api';
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

// coverphoto
const Post = lazy(() => import('../../components/Post'));
const PostPhoto = lazy(() => import('../../components/Post/PostPhoto'));

export default function MyCollectPosts() {
    const token = useToken();
    const user_id = localStorage.getItem('user_id');

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const intl = useIntl();
    const navigate = useNavigate();

    // coverphoto
    const [images, setImages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [remainingImageIds, setRemainingImageIds] = useState([]);

    useEffect(() => {
        // api: get favorite post
        if(token && user_id){
            handleFavoritePost()
        }
    }, [token, user_id])

    useEffect(() => {
        if(posts.length !== 0){
            const ids = posts.map(post => post._id);
            setRemainingImageIds(ids);
        }

    }, [posts])

    // coverphoto api 一次只叫5個
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
    

    async function handleFavoritePost(){
        // api: get favorite post
        try{
            const data = await collectApi.getMyCollectPostList(user_id, token);

            if(data.success){
                setPosts(data.result);
            }else{
                setPosts([]);
            }
        }catch(err){
            setPosts([]);
            toast.error(intl.formatMessage('collect.getFailed'));
        }
        setIsLoading(false);
    }

    // coverphoto id與圖對應函數
    function getCoverPhotoByPid(pid) {
        const item = images.find(element => element.pid === pid);
        return item ? item.coverPhoto : null;
    }

    function onClickPost(post) {
        navigate(`/${post.type}/detail/${post._id}`)
    }

    return (
        <HomeContainer>
                <PostContainer>
                    {posts.length === 0 ?
                        <NoContent>
                            {intl.formatMessage({ id: 'home.noContent' })}
                        </NoContent>
                        : posts.map((post, index) => (
                            <React.Fragment key={post._id}>
                                <PostWrapper
                                    showDivider={index !== posts.length - 1}
                                    onClick={() => onClickPost(post)}
                                >
                                    <Suspense fallback={<div>Loading post...</div>}>
                                        <Post post={post} showDivider={index !== posts.length - 1} />
                                    </Suspense>
                                    <Suspense fallback={<div>Loading photo...</div>}>
                                        <PostPhoto src={getCoverPhotoByPid(post._id)} />
                                    </Suspense>
                                </PostWrapper>
                            </React.Fragment>
                        ))
                    }
                </PostContainer>
        </HomeContainer>
    )
}