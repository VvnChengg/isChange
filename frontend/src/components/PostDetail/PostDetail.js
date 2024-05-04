import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
    PostDetailWrapper,
    PostDetailTitle,
    PostDetailRow,
    PostDetailIcon,
    PostDetailContent
} from './PostDetail-style.js';

import Tag from '../Tag';
import Icon from '../Icon';

export default function PostDetail({ post }) {
    console.log(post.product_pic);
    return (
        <PostDetailWrapper>
            <PostDetailTitle>{post.title || post.event_title || post.trans_title}</PostDetailTitle>
            {post.trans_type &&
                <div style={{ display: 'flex', alignItems: 'center', gap: 5}}>
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
                {post.event_intro && post.event_intro.split('\n').map((line, index , array) => (
                    <div key={index}>
                        {line}
                    </div>
                ))}
                {post.trans_intro && post.trans_intro.split('\n').map((line, index , array) => (
                    <div key={index}>
                        {line}
                    </div>
                ))}
                {post.product_pic && <img src={post.product_pic} alt='product' />}
            </PostDetailContent>
        </PostDetailWrapper>
    )
}