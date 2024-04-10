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
                <Tag type='trans' />
                <PostIcon src='location' />
                <div>法國，巴黎</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '80%'}}>
                <PostTitle>{post.article_title}</PostTitle>
                <PostPreview>使用半年，準備回國故售出～狀態良好......</PostPreview>
            </div>
            <PostImage />
        </PostWrapper>
    )
}