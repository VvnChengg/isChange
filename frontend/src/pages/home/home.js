import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../api';

import {
    PostContainer,
    PostSelector
} from './home-style';

import PostTypeSelector from '../../components/PostTypeSelector';
import Post from '../../components/Post';
import SideBar from '../../components/SideBar';
import Icon from '../../components/Icon';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


export default function Home() {
    const navigate = useNavigate();

    const [showSideBar, setShowSideBar] = useState(false);
    const [type, setType] = useState('all');
    const [posts, setPosts] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        api.getAllPosts()
        .then(res => {
            setPosts(res);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <Spin />;
    }

    return (
        <PostContainer>
            <PostTypeSelector type={type} setType={setType} />
            {posts
                ?.filter(post => type === 'all' || post.type === type)
                .map(post => 
                    <Post
                        key={post._id}
                        post={post}
                        onClick={() => navigate(`/${post.type}/detail/${post._id}`)}
                    />
                )
            }
            <PostSelector onClick={() => setShowSideBar(!showSideBar)}>
                {showSideBar ? <Icon.Close /> : <Icon.Selector />}
            </PostSelector>
            <SideBar showSideBar={showSideBar} type={type} />
        </PostContainer>
    )
}