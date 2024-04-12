import React from "react";
import "./shareEdit-style.css";
import { PostContainer } from "./post-style";

import Post from "../../components/Post";

export default function MyComponent() {
  return (
    <div className="container">
      <div className="edit-content">
        <div className="left-section">
          <div className="flex flex-col grow post-content">
            <div className="blue-rectangle-group">
              <button className="blue-rectangle">已發布貼文</button>
              <button className="gray-rectangle">尋找貼文</button>
            </div>
          </div>
          {/* <PostContainer> */}
            <Post/>
            <Post/>
          {/* </PostContainer> */}
        </div>
        <div className="right-section">
          <div className="flex flex-col py-5 pr-5 pl-2.5 mx-auto mt-36 w-full rounded-3xl bg-sky-600 bg-opacity-80 max-md:mt-10">
            <div className="button-container">
              <button className="blue-button">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b0cb189945a8eb1b5251b980af85a97b83f902f561131a62ef6b241205de074b?"
                  className="object-cover"
                  alt="Create Post"
                />
                <span className="text-xl font-bold leading-7">建立貼文</span>
              </button>
              <button className="blue-button">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9421264e6e8cfbeade02b8b178018220efeb1e96004486e15ba139fd54bcf95?"
                  className="object-cover"
                  alt="Edit Post"
                />
                <span className="text-xl font-bold leading-7">編輯貼文</span>
              </button>
              <button className="blue-button">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6f5c289d2c51390652a5d5eb3bf61a141ba6da687f96b5444e6f26645b8844f?"
                  className="object-cover"
                  alt="Delete Post"
                />
                <span className="text-xl font-bold leading-7">刪除貼文</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
