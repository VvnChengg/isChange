import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import {
    PostWrapper,
    PostTopBar,
    PostInfoContainer,
    PostInfo,
    PostIcon,
    PostTitle,
    PostPreview
    
} from './Post-style.js';

import Tag from '../Tag';
import Icon from '../Icon';

export default function Post({ post, onClick, showDivider }) {
    const intl = useIntl();

    const samplePost = {
        type: 'post',
        title: 'SAMPLE',
        content: 'this is a sample post :D'
    }

    function getLocation() {
        if (!post) return;
        
        if (intl.locale === 'en') {
            if (post.artical_region_en && post.artical_region_en[0])
                return post.artical_region_en.join(', ');
            else if (post.destination_en && post.destination_en[0])
                return post.destination_en.join(', ');
            else if (post.transaction_region_en && post.transaction_region_en[0])
                return post.transaction_region_en.join(', ');
        } else if (intl.locale === 'zh') {
            if (post.article_region_zh && post.article_region_zh[0])
                return post.article_region_zh.join(', ');
            else if (post.destination_zh && post.destination_zh[0])
                return post.destination_zh.join(', ');
            else if (post.transaction_region_zh && post.transaction_region_zh[0])
                return post.transaction_region_zh.join(', ');
        }
    }

    function renderStatus() {
        if (post && (post.type === 'trans' || post.type === 'tour')) {
            return (
                <Tag type={post.status} />
            );
        }
        return null;
    }

    return (
        <div onClick={onClick} showDivider={showDivider}>
            <PostTopBar>
                <Tag type={post ? post.type : samplePost.type} />
                <PostInfoContainer>
                    {post && post.datetime && post.end_time && 
                        <PostInfo>
                            <PostIcon>
                                <Icon.Time />
                            </PostIcon>
                            <div>{post.datetime.substring(0, 10)} - {post.end_time.substring(0, 10)}</div>
                        </PostInfo>
                    }
                    {getLocation() && 
                        <PostInfo>
                            <Icon.Location />
                            {getLocation()}
                        </PostInfo>
                    }
                    {post && (post.budget || post.price) && post.currency && 
                        <PostInfo>
                            <PostIcon>
                                <Icon.Money />
                            </PostIcon>
                            <div>{post.budget || post.price.$numberDecimal} {post.currency}</div>
                        </PostInfo>
                    }
                    {post && post.people_lb && post.people_ub && 
                        <PostInfo>
                            <PostIcon>
                                <Icon.People />
                            </PostIcon>
                            <div>{post.people_lb} - {post.people_ub}</div>
                        </PostInfo>
                    }
                </PostInfoContainer>
                {renderStatus()}
            </PostTopBar>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '80%'}}>
                <PostTitle>{post ? post.title : samplePost.title}</PostTitle>
                <PostPreview>{post && post.content ? post.content.substring(0, 25) : samplePost.content.substring(0, 25)}......</PostPreview>
            </div>
        </div>
    )
}


