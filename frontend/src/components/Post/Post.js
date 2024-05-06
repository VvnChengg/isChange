import React, { useState, useEffect } from 'react';
import {
    PostWrapper,
    PostIcon,
    PostTitle,
    PostPreview,
    PostImage
} from './Post-style.js';

import Tag from '../Tag';
import Icon from '../Icon';

export default function Post({ post, onClick }) {
    const [coverPhoto, setCoverPhoto] = useState(null);

    const samplePost = {
        type: 'post',
        title: 'SAMPLE',
        content: 'this is a sample post :D'
    }

    /*
    function renderStatus() {
        if the post is product or tour
            return (
                <Tag type={status} />
            )
    }
    */
    useEffect(() => {
        if (post && post.coverPhoto) {
            isValidImageBase64(post.coverPhoto).then(isValid => {
                if (isValid) {
                    setCoverPhoto(post.coverPhoto);
                }
            });
        }
    }, [post]);

    function renderStatus() {
        if (post && (post.type === 'trans' || post.type === 'tour')) {
            return (
                <Tag type={post.status} />
            );
        }
        return null;
    }

    function isValidImageBase64(str) {
        return new Promise((resolve) => {
            // Create new image element
            var img = new Image();
            // Set the img src to the base64 string
            img.src = str;
            // Validate the image
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
        });
    }
    
    return (
        <PostWrapper onClick={onClick}>
            <div style={{display: 'flex', alignItems: 'center', gap: '7px'}}>
                <Tag type={post ? post.type : samplePost.type} />
                {/* post.status && renderStatus() */}
                {post && post.datetime && post.end_time && 
                    <>
                        <Icon.Time />
                        <div>{post.datetime.substring(0, 10)} - {post.end_time.substring(0, 10)}</div>
                    </>
                }
                {post && post.location &&
                    <>
                        <PostIcon src='location' />
                        <div>{post.location}</div>
                    </>
                }
                {post && (post.budget || post.price) && post.currency && 
                    <>
                        <Icon.Money />
                        <div>{post.budget || post.price.$numberDecimal} {post.currency}</div>
                    </>
                }
                {post && post.people_lb && post.people_ub && 
                    <>
                        <Icon.People />
                        <div>{post.people_lb} - {post.people_ub}</div>
                    </>
                }
                
                {renderStatus()}

            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '80%'}}>
                <PostTitle>{post ? post.title : samplePost.title}</PostTitle>
                <PostPreview>{post ? post.content.substring(0, 25) : samplePost.content.substring(0, 25)}......</PostPreview>
            </div>
            {coverPhoto ? <PostImage src={coverPhoto} /> : ''}
        </PostWrapper>
    )
}