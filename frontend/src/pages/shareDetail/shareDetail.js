import React from "react";
import "./shareDetail-style.css";
// import { AiOutlineMail } from "https://esm.sh/react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function MyComponent() {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/'; 
    navigate(path);
  };

  return (
    <div className="flex-container">
      <div className="container">
        <div className="flex-wrapper">
          <div className="left-section">
            <div className="flex-content">
              <div className="title-wrapper">
                <img
                  className="title-img"
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d164f973484caa9604cbdaa4c89940ea90cb5dc809b962688855cf182d497f1a?"
                />
                <div className="title-text">歐洲機票/火車票省錢小秘訣</div>
              </div>
              <div className="share-info">
                <div className="share-btn">分享</div>
                <div className="location-info">
                  <img
                    className="location-img"
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/16cdf560b23133dfbbb7f1e9d8a8d9d5dc38c7a3f7de3296dcf78eef77d45513?"
                  />
                  <div className="location-text">瑞典，斯德哥爾摩</div>
                </div>
              </div>
              <div className="content-info">
                這半年來玩了十個國家，整理了一些買機票、火車票的經驗跟大家分享
                XX 航空的機票在 1 月常常會特價，還會附行李額......
              </div>
              <div className="button-group">
                <button className="figure-button" onClick={() => routeChange()}><img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/93f6692886fef5c4e581a6d50dc8918be3bc625cacd01ff9a3aa406d436bc2cb?"
                  // className="image-wrapper"
                /></button>
                <button className="figure-button" onClick={() => routeChange()}><img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5a756b58d142cb690b645513a52d30b8b67dfb9c2d2d8b9b14f5e59e54c55c5?"
                  // className="image-wrapper"
                /></button>
                <button className="figure-button" onClick={() => routeChange()}><img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b5dfa48625bbd19eba35a880219025866e4486fd2d4895d0ab7a334a9ce5e40?"
                  // className="image-wrapper"
                /></button>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/93f6692886fef5c4e581a6d50dc8918be3bc625cacd01ff9a3aa406d436bc2cb?"
                  // className="image-wrapper"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5a756b58d142cb690b645513a52d30b8b67dfb9c2d2d8b9b14f5e59e54c55c5?"
                  className="image-wrapper"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b5dfa48625bbd19eba35a880219025866e4486fd2d4895d0ab7a334a9ce5e40?"
                  className="image-wrapper"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
