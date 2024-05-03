import { useEffect, useState } from 'react';

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
                .map((post, index) => 
                    <Post key={`post${index}`} post={post} />
                )
            }
            <PostSelector onClick={() => setShowSideBar(!showSideBar)}>
                {showSideBar ? <Icon.Close /> : <Icon.Selector />}
            </PostSelector>
            <SideBar showSideBar={showSideBar} type={type} />
        </PostContainer>
    )
}