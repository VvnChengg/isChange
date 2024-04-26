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
    return (
        <PostDetailWrapper>
            <PostDetailTitle>{post.title || post.event_title}</PostDetailTitle>
            {post.start_time && 
                <PostDetailRow>
                    <PostDetailIcon>
                        <Icon.Time />
                    </PostDetailIcon>
                    {post.start_time} - {post.end_time}
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
            <PostDetailContent>
                {post.event_intro.split('\n').map((line, index , array) => (
                    <div key={index}>
                        {line}
                    </div>
                ))}
            </PostDetailContent>
        </PostDetailWrapper>
    )
}