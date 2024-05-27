import { useEffect, useState } from 'react';
import React, { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../api';

import {
    HomeContainer,
    PostContainer,
    SpinContainer,
    NoContent,
    HomeTopBar,
    PostSelector
} from './home-style';
import { PostWrapper } from '../../components/Post/Post-style'

import AsyncImage from '../../components/Post/AsyncImage';
import PostTypeSelector from '../../components/PostTypeSelector';
//import Post from '../../components/Post';
//import PostPhoto from '../../components/Post/PostPhoto';
import SideBar from '../../components/SideBar';
import Icon from '../../components/Icon';

import { Spin } from 'antd';
import { FormattedMessage } from 'react-intl';
// coverphoto
const Post = lazy(() => import('../../components/Post'));
const PostPhoto = lazy(() => import('../../components/Post/PostPhoto'));

export default function Home({
    keyword, setKeyword,
    search, setSearch,
    type, setType,
    sort, setSort,
    radius, setRadius,
    filters, setFilters,
    filterOptions
}) {
    const navigate = useNavigate();

    const [showSideBar, setShowSideBar] = useState(false);
    const [posts, setPosts] = useState([]);
    const [hotPosts, setHotPosts] = useState([]);
    const [geoPosts, setGeoPosts] = useState([]);
    const [toRenderPosts, setToRenderPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    // coverphoto
    const [images, setImages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [remainingImageIds, setRemainingImageIds] = useState([]);

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
                const dateA = new Date(postA.datetime);
                const dateB = new Date(postB.datetime);

                if (dateA === undefined && dateB === undefined) return 0;
                else if (dateA === undefined) return 1;
                else if (dateB === undefined) return -1;
                else if (sort === 'dateClose') return dateA - dateB;
                else return dateB - dateA;
            }
            return 0;
        });
    }

    function filterPosts(posts) {
        if (type === 'trans' || type === 'tour')
            posts = posts.filter(post => {
                for (let key in post) {
                    if (filterOptions[post.type].hasOwnProperty(key)) {
                        const options = filters[post.type][key];
                        if (!options.includes(post[key])) {
                            return false;
                        }
                    }
                }
                return true;
            });
        return posts;  
    }

    function renderPosts() {
        let tempPosts = posts.slice();
        if (sort === 'hot') tempPosts = hotPosts.slice();
        else if (sort === 'close' || radius !== 40075) tempPosts = geoPosts.slice().reverse();
        else if (sort === 'far') tempPosts = geoPosts.slice();

        // filter type
        tempPosts = tempPosts.filter(post => type === 'all' || post.type === type);
        
        // sort
        sortPosts(tempPosts);

        // other filters
        tempPosts = filterPosts(tempPosts);

        return tempPosts;
    }

    function onClickPost(post) {
        setKeyword('');
        navigate(`/${post.type}/detail/${post._id}`)
    }

    // get posts
    useEffect(() => {
        if (search) return;

        setIsLoading(true);
        api.getAllPosts()
        .then(res => {
            setPosts(res);
            setToRenderPosts(res);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        });

        // setIsLoading(true);
        api.getHotPosts()
        .then(res => {
            setHotPosts(res);
            // setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            // setIsLoading(false);
        });

        // setIsLoading(true);
        api.getGeoPosts()
        .then(res => {
            setGeoPosts(res);
            // setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            // setIsLoading(false);
        });
    }, []);

    // filter geo posts
    useEffect(() => {
        if (radius !== 40075) {
            setIsLoading(true);
            api.filterGeoPosts(radius * 1000)
            .then(res => {
                setGeoPosts(res);
                setIsLoading(false);
            })
            .catch(err => {
                if (err === '沒有找到任何內容') {
                    setToRenderPosts([]);
                    setGeoPosts([]);
                }
                console.log(err);
                setIsLoading(false);
            });
        } else setGeoPosts(posts);
    }, [radius]);

    // search posts
    useEffect(() => {
        if (search) {
            setIsLoading(true);
            api.searchPosts(keyword)
            .then(res => {
                setPosts(res);
                setToRenderPosts(res);
                setIsLoading(false);
                setSearch(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
        }
        else if (keyword === '') {
            setIsLoading(true);
            api.getAllPosts()
            .then(res => {
                setPosts(res);
                setToRenderPosts(res);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
        }
    }, [search, keyword]);

    // initialize sort
    useEffect(() => {
        setSort('new');
        setFilters(filterOptions);
    }, [type]);

    useEffect(() => {
        setToRenderPosts(renderPosts());
    }, [type, sort, filters, geoPosts]);

    // coverphoto 建立一個 id 清單 toRenderPost為所有會顯示的文章
    useEffect(() => {
        const ids = toRenderPosts.map(post => post._id);
        setRemainingImageIds(ids);
    }, [toRenderPosts]);

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
    
    // coverphoto id與圖對應函數
    function getCoverPhotoByPid(pid) {
        const item = images.find(element => element.pid === pid);
        return item ? item.coverPhoto : null;
    }

    return (
        <HomeContainer>
            <HomeTopBar>
                <PostTypeSelector type={type} setType={setType} />
                <PostSelector onClick={() => setShowSideBar(!showSideBar)}>
                    {showSideBar ? <Icon.Close /> : <Icon.Selector />}
                </PostSelector>
                <SideBar
                    showSideBar={showSideBar}
                    type={type}
                    sort={sort}
                    setSort={setSort}
                    radius={radius}
                    setRadius={setRadius}
                    filters={filters}
                    setFilters={setFilters}
                    filterOptions={filterOptions}
                />
            </HomeTopBar>
                {/* <SpinContainer>
                    <Spin />
                </SpinContainer> : */}
                <PostContainer>
                    {toRenderPosts.length === 0 ?
                        <NoContent>
                            <FormattedMessage id='home.noContent' />
                        </NoContent>
                        : toRenderPosts.map((post, index) => (
                            <React.Fragment key={post._id}>
                                <PostWrapper
                                    showDivider={index !== toRenderPosts.length - 1}
                                    onClick={() => onClickPost(post)}
                                >
                                    <Suspense fallback={<div>Loading post...</div>}>
                                        <Post post={post} showDivider={index !== toRenderPosts.length - 1} />
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