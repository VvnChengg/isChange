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
    const [sort, setSort] = useState('new');
    const [posts, setPosts] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    function sortPosts(posts) {
        posts.sort((postA, postB) => {
            if (sort === 'priceLow' || sort === 'priceHigh' || sort === 'budgetLow' || sort === 'budgetHigh') {
                const priceA = postA.price ? postA.price.$numberDecimal : postA.budget;
                const priceB = postB.price ? postB.price.$numberDecimal : postB.budget;

                if (priceA === undefined && priceB === undefined) return 0;
                else if (priceA === undefined) return 1;
                else if (priceB === undefined) return -1;
                else if (sort === 'priceLow' || sort === 'budgetLow') return priceA - priceB;
                else return priceB - priceA;
            }
            else if (sort === 'dateClose' || sort === 'dateFar') {
                // 待改成 start_time
                const dateA = new Date(postA.end_time);
                const dateB = new Date(postB.end_time);

                if (dateA === undefined && dateB === undefined) return 0;
                else if (dateA === undefined) return 1;
                else if (dateB === undefined) return -1;
                else if (sort === 'dateClose') return dateA - dateB;
                else return dateB - dateA;
            }
            return 0;
        });

        return posts;
    }

    useEffect(() => {
        setIsLoading(true);

        if (sort === 'hot')
            api.getHotPosts()
            .then(res => {
                setPosts(res);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
        else
            api.getAllPosts()
            .then(res => {
                if (sort === 'new')
                    setPosts(res);
                else 
                    setPosts(sortPosts(res));
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, [sort]);

    useEffect(() => setSort('new'), [type]);

    return (
        <PostContainer>
            <PostTypeSelector type={type} setType={setType} />
            {isLoading
                ? <Spin />
                : posts
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
            <SideBar
                showSideBar={showSideBar}
                type={type}
                sort={sort}
                setSort={setSort}
            />
        </PostContainer>
    )
}