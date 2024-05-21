import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';


import {
    PostDetailWrapper,
    InnerWrapper,
    PostDetailTitle,
    PostDetailButtonContainer,
    PostDetailRow,
    PostDetailIcon,
    PostDetailContent,
    PostDetailImage
} from './PostDetail-style.js';

import SharePage from '../../components/SharePage';
import LikePost from '../../components/LikePost';
import CollectPost from '../CollectPost/CollectPost.js';
import Tag from '../Tag';
import Icon from '../Icon';

export default function PostDetail({ post }) {
    // 部署到服務器上時應該url就可以用了, 現在因為URL是local端 API會報錯
    const url = window.location.href;

    const token = localStorage.getItem('access_token');
    const user_id = localStorage.getItem('user_id');
    const expiryTime = localStorage.getItem('expiry_time');
    const intl = useIntl();

    // 判斷 token 是否過期
    useEffect(() => {
        const now = new Date();
        if (token && user_id && expiryTime) {
            if (now.getTime() > Number(expiryTime)) {
                toast.error(intl.formatMessage({ id: 'token.Expiry' }));
                localStorage.clear();
                return
            }
        }
    }, [expiryTime, token, user_id]);


    console.log(post.title);

    return (
        <PostDetailWrapper>
            <InnerWrapper>
                <PostDetailTitle>
                    {post.title || post.event_title || post.trans_title}
                </PostDetailTitle>



                <PostDetailButtonContainer>
                    <SharePage url={url} />
                    <LikePost
                        likes={post.likes}
                        isLiked={post.isLiked}
                        pid={post.pid}
                    />
                    {user_id && post.creator_id !== user_id &&
                        <CollectPost
                            post={post}
                            user_id={user_id}
                            token={token}
                        />
                    }
                </PostDetailButtonContainer>

                {intl.locale === 'en' && post.transaction_region_en &&
                    <PostDetailRow>
                        <Icon.Location />
                        {post.transaction_region_en.join(', ')}
                    </PostDetailRow>
                }

                {intl.locale === 'zh' && post.transaction_region_zh &&
                    <PostDetailRow>
                        <Icon.Location />
                        {post.transaction_region_zh.join(', ')}
                    </PostDetailRow>
                }

                {post.trans_type &&
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Tag type={post.trans_type} />
                        {post.trans_method}
                    </div>
                }

                {post.start_time &&
                    <PostDetailRow>
                        <PostDetailIcon>
                            <Icon.Time />
                        </PostDetailIcon>
                        {post.start_time} - {post.end_time}
                    </PostDetailRow>
                }
                {post.rent_start_time &&
                    <PostDetailRow>
                        <PostDetailIcon>
                            <Icon.Time />
                        </PostDetailIcon>
                        {post.rent_start_time} - {post.rent_end_time}
                    </PostDetailRow>
                }
                {post.people_lb &&
                    <PostDetailRow>
                        <PostDetailIcon>
                            <Icon.People />
                        </PostDetailIcon>
                        {post.people_lb} - {post.people_ub}{' '}
                        <FormattedMessage id='tour.peopleUnit' />
                    </PostDetailRow>
                }
                {post.budget &&
                    <PostDetailRow>
                        <PostDetailIcon>
                            <Icon.Money />
                        </PostDetailIcon>
                        {post.budget} {post.currency}
                    </PostDetailRow>
                }
                {post.price_lb &&
                    <PostDetailRow>
                        <PostDetailIcon>
                            <Icon.Money />
                        </PostDetailIcon>
                        {post.price_lb} - {post.price_ub}{' '}{post.currency}
                    </PostDetailRow>
                }
                <PostDetailContent>
                    {post.content && post.content.split('\n').map((line, index, array) => (
                        <div key={index}>
                            {line}
                        </div>
                    ))}
                    {post.event_intro && post.event_intro.split('\n').map((line, index, array) => (
                        <div key={index}>
                            {line}
                        </div>
                    ))}
                    {post.trans_intro && post.trans_intro.split('\n').map((line, index, array) => (
                        <div key={index}>
                            {line}
                        </div>
                    ))}
                    {post.product_pic && <PostDetailImage src={post.product_pic} alt='product_image' />}
                    {post.event_pic && <PostDetailImage src={post.event_pic} alt='event_image' />}
                    {post.coverPhoto && <PostDetailImage src={post.coverPhoto} alt='post_image' />}
                </PostDetailContent>
            </InnerWrapper>
        </PostDetailWrapper>
    )
}