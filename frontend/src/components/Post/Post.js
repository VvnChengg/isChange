import {
    PostWrapper,
    PostIcon,
    PostTitle,
    PostPreview,
    PostImage
} from './Post-style.js';

import Tag from '../Tag';

export default function Post({ post }) {
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
    function renderStatus() {
        if (post && (post.type === 'trans' || post.type === 'tour')) {
            return (
                <Tag type={post.status} />
            );
        }
        return null;
    }


    return (
        <PostWrapper>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Tag type={post ? post.type : samplePost.type} />
                {/* post.status && renderStatus() */}
                {post && post.location &&
                    <>
                        <PostIcon src='location' />
                        <div>{post.location}</div>
                    </>
                }
                {renderStatus()}

            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '80%'}}>
                <PostTitle>{post ? post.title : samplePost.title}</PostTitle>
                <PostPreview>{post ? post.content.substring(0, 25) : samplePost.content.substring(0, 25)}......</PostPreview>
            </div>
            {(post && post.coverPhoto) ? <PostImage src={post.coverPhoto} /> : ''}
        </PostWrapper>
    )
}