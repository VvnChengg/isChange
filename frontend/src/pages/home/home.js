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

export default function Home() {
    const navigate = useNavigate();

    const [showSideBar, setShowSideBar] = useState(false);
    const [type, setType] = useState('all');
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        api.getAllPosts()
        .then(res => setPosts(res))
        .catch(err => console.log(err));
    }, []);

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