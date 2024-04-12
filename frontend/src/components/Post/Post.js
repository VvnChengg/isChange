import {
    PostWrapper,
    PostIcon,
    PostTitle,
    PostPreview,
    PostImage
} from './Post-style.js';

import Tag from '../Tag';

export default function Post({ post }) {
    return (
        <PostWrapper>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Tag type={post.type} />
                <PostIcon src='location' />
                <div>法國，巴黎</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '80%'}}>
                <PostTitle>{post.title}</PostTitle>
                <PostPreview>{post.content.substring(0, 20)}......</PostPreview>
            </div>
            {(post.coverPhoto) ? <PostImage src={post.coverPhoto} /> : ''}
        </PostWrapper>
    )
}