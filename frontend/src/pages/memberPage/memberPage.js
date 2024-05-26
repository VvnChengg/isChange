import React, { useState, useEffect, Suspense, lazy } from 'react';
import {
    Container,
    Header,
    Avatar,
    UserInfo,
    Username,
    IntroInfo,
    NavInfo,
    FloatingHeader,
    UserContainer,
    MemberButtonContainer,
    HeaderBackground,
    MemberContainer,
    PageContainer,
    AvatarContainer,
    NavBarAvatar,
    Row,
    StyledFaCheckCircle
} from './memberPage-style.js';
import {
    HomeContainer,
    PostContainer,
    SpinContainer,
    NoContent,
    HomeTopBar,
    PostSelector
} from '../home/home-style.js';
import { PostWrapper } from '../../components/Post/Post-style.js'

import { viewApi } from '../../api/viewApi.js';
import { useParams } from 'react-router-dom';
import FollowMemberButton from '../../components/FollowMemberButton/index.js';
import StartPrivate from '../../components/StartPrivate/StartPrivate.js';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const Post = lazy(() => import('../../components/Post/index.js'));
const PostPhoto = lazy(() => import('../../components/Post/PostPhoto.js'));

export default function MemberPage() {
    const { other_username } = useParams();
    const token = localStorage.getItem('access_token');
    const intl = useIntl();
    const [postLoading, setPostLoading] = useState(true);
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const user_id = localStorage.getItem('user_id');


    const [memberInfo, setMemberInfo] = useState({
        username: '',
        exchange_school_name: '',
        photo: '',
        intro: '',
        student_verification: false,
        _id: ''
    });

    const [posts, setPosts] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [showFloatingHeader, setShowFloatingHeader] = useState(undefined);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (memberInfo._id) {
            if (memberInfo._id === user_id) {
                navigate('/member');
            }
        }
    }, [memberInfo._id])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowFloatingHeader(true);
            } else {
                setShowFloatingHeader(false);
            }
        };

        if (isMounted) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMounted]);


    // 先讀取使用者資料
    const getOtherMemberInfo = async () => {
        const memberInfo = await viewApi.getOtherMember(other_username);
        console.log(memberInfo);

        setMemberInfo(prevMemberInfo => ({ ...prevMemberInfo, ...memberInfo }));
        setIsLoading(false);

    }

    async function getPostList() {
        try {
            const data = await viewApi.getOtherMemberPosts(other_username);
            if (data) {
                setPosts(data.result);
            } else {
                toast.error(intl.formatMessage('view.getPostFailed'));
            }
        } catch (err) {
            setPosts([]);
            toast.error(intl.formatMessage('view.getPostFailed'));
        }
        setPostLoading(false);
    }

    useEffect(() => {
        console.log(posts);
    }, [posts]);

    useEffect(() => {
        console.log(showFloatingHeader);
    }, [showFloatingHeader]);


    useEffect(() => {
        if (other_username) {
            getOtherMemberInfo();
            getPostList();
        }
    }, [other_username]);


    if (isLoading) {
        return <Spin />;
    }

    function getCoverPhotoByPid(pid) {
        const item = images.find(element => element.pid === pid);
        return item ? item.coverPhoto : null;
    }




    return (
        <PageContainer>
            <HeaderBackground></HeaderBackground>
            <Container>

                <FloatingHeader show={showFloatingHeader && isMounted}>
                    <Row>
                        <NavBarAvatar src={memberInfo.photo} alt="Avatar" style={{ width: '40px', height: '40px' }} />
                        <Username>{memberInfo.username}</Username>
                        <NavInfo>{intl.formatMessage({ id: 'view.followHint' }, { other_username: other_username })}</NavInfo>
                        <FollowMemberButton
                            username={other_username}
                            token={token}
                            style={{ marginLeft: 'auto' }} // 移动到这里
                        />
                    </Row>
                </FloatingHeader>


                <Header>
                    <MemberContainer>
                        <AvatarContainer>
                            <div style={{ position: 'relative', width: '100px', height: '100px', top: '-75px' }}>
                                <Avatar src={memberInfo.photo} alt="Avatar" />
                                {memberInfo.student_verification && <StyledFaCheckCircle />}
                            </div>
                            <UserInfo>
                                <Username>{memberInfo.username}</Username>
                                <UserContainer>
                                    {memberInfo.exchange_school_name}
                                </UserContainer>
                            </UserInfo>
                            <IntroInfo>{memberInfo.intro}</IntroInfo>
                        </AvatarContainer>
                        <MemberButtonContainer>
                            <StartPrivate
                                receiver_name={other_username}
                                receiver_id={memberInfo._id}
                            />

                            <FollowMemberButton
                                username={other_username}
                                token={token}
                            />
                        </MemberButtonContainer>
                    </MemberContainer>
                </Header>
                {postLoading ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                        <Spin />
                    </div>
                    : posts.length === 0 ?
                        <NoContent>
                            {intl.formatMessage({ id: 'home.noContent' })};
                        </NoContent>
                        : posts.map((post, index) => (
                            <React.Fragment key={post._id}>
                                <PostWrapper showDivider={index !== posts.length - 1} onClick={() => navigate(`/${post.type}/detail/${post._id}`)}>
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
            </Container>
        </PageContainer>
    );
}
