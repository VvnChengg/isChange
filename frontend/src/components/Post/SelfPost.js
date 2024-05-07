

import Post from './Post.js';

export default function SelfPost({ post }) {
    const samplePost = {
        type: 'post',
        title: 'SAMPLE',
        content: 'this is a sample post :D'
    }

    return (
        <Post></Post>
    )
}