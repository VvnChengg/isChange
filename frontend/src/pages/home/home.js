import { useEffect, useState } from "react";

import { api } from "../../api";

import { PostContainer } from "./home-style";
import Post from "../../components/Post";

export default function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        api.getAllPosts()
        .then(res => setPosts(res))
        .catch(err => console.log(err));
    }, []);

    return (
        <PostContainer>
            {posts?.map((post, index) => 
                <Post key={`post${index}`} post={post} />
            )}
        </PostContainer>
    )
}