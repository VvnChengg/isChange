import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../api';

import {
    PostContainer,
    SpinContainer,
    NoContent,
    PostSelector
} from './home-style';

import PostTypeSelector from '../../components/PostTypeSelector';
import Post from '../../components/Post';
import SideBar from '../../components/SideBar';
import Icon from '../../components/Icon';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { FormattedMessage } from 'react-intl';


export default function Home({ keyword }) {
    const navigate = useNavigate();

    const filterOptions = {
        trans: {
            productType: ['kitchen', 'living room', 'restroom', 'cosmetic','clothing', 'others'],
            transactionWay: ['sell', 'purchase', 'lend', 'borrow'],
            status: ['in stock', 'reserved', 'sold'],
            currency: ['USD', 'GBP', 'EUR', 'TWD', 'CAD', 'AUD']
        },
        tour: {
            status: ['ongoing', 'complete', 'end'],
            currency: ['USD', 'GBP', 'EUR', 'TWD', 'CAD', 'AUD']
        }
    }

    const [showSideBar, setShowSideBar] = useState(false);

    const [type, setType] = useState('all');
    const [sort, setSort] = useState('new');
    const [filters, setFilters] = useState(filterOptions);
    
    const [posts, setPosts] = useState([]);
    const [hotPosts, setHotPosts] = useState([]);
    const [toRenderPosts, setToRenderPosts] = useState([]);

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

        // filter type
        tempPosts = tempPosts.filter(post => type === 'all' || post.type === type);
        
        // sort
        sortPosts(tempPosts);

        // other filters
        tempPosts = filterPosts(tempPosts);

        return tempPosts;
    }

    useEffect(() => {
        setIsLoading(true);
        api.getHotPosts()
        .then(res => {
            setHotPosts(res);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        });
        
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
    }, []);

    useEffect(() => {
        if (keyword) {
            setIsLoading(true);
            api.searchPosts(keyword)
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
    }, [keyword]);

    useEffect(() => {
        setSort('new');
        setFilters(filterOptions);
    }, [type]);

    useEffect(() => {
        setToRenderPosts(renderPosts());
    }, [type, sort, filters]);

    return (
        <PostContainer>
            <PostTypeSelector type={type} setType={setType} />
            {isLoading ?
                <SpinContainer>
                    <Spin />
                </SpinContainer>
                : (toRenderPosts.length === 0 ?
                    <NoContent>
                        <FormattedMessage id='home.noContent' />
                    </NoContent>
                    : toRenderPosts.map((post, index) => 
                    <Post
                        key={post._id}
                        post={post}
                        showDivider={index !== toRenderPosts.length - 1}
                        onClick={() => navigate(`/${post.type}/detail/${post._id}`)}
                    />
                ))
            }
            <PostSelector onClick={() => setShowSideBar(!showSideBar)}>
                {showSideBar ? <Icon.Close /> : <Icon.Selector />}
            </PostSelector>
            <SideBar
                showSideBar={showSideBar}
                type={type}
                sort={sort}
                setSort={setSort}
                filters={filters}
                setFilters={setFilters}
                filterOptions={filterOptions}
            />
        </PostContainer>
    )
}