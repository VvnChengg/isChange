import React, {useEffect, useState} from "react";
import "./shareDetail-style.css";
// import { AiOutlineMail } from "https://esm.sh/react-icons/ai";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import axios from 'axios';

export default function MyComponent() {
  const [post, setPost] = useState()
  // const [posts, setPosts] = useState();
  // useEffect(() => {
  //     api.getAllPosts()
  //     .then(res => setPosts(res))
  //     .catch(err => console.log(err));
  // }, []);
  
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/'; 
    navigate(path);
  };

  const hostname = 'http://localhost:3000/api';
  // useEffect(() => {
  //   // 發送 API 請求
  //   axios.get(`${hostname}/chat/check`, { params: { receiver_id: receiver_id } })
  //     .then(response => {
  //       // 設置獲取到的數據
  //       //console.log(response.data);
  //       setchatId(response.data.chat_id);
        
  //     })
  //     .catch(error => {
  //       console.error('API 請求失敗:', error);
  //     });
  // }, []);

  return (
    <div className="flex-container">
      <div className="detail-container">
        {/* <div className="flex-wrapper"> */}
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
                <img
                  loading="lazy"
                  src="https://hips.hearstapps.com/hmg-prod/images/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2-2023-06-17-215142-648dc0e3d1ef6.png"
                  className="inserted-figure"
                />
                要省歐洲機票和火車票費用真的不難。<br/><br/>首先，提前計劃是關鍵！我通常會提前數個月預訂機票和火車票，因為這樣可以享受到早鳥優惠和特價票。<br/>其次，保持彈性。如果你的旅程日期比較靈活，可以避開熱門的旅遊季節和假期，這樣票價通常會更便宜一些。<br/>另外，利用比價網站和App也是個好主意。這些工具可以幫助你比較不同航空公司和火車公司的價格，找到最划算的選擇。<br/>還有，如果你是學生或年輕人，可以考慮申請相應的折扣卡，這樣在購票時能享受到額外的折扣。<br/>最後，別忘了追蹤航空公司和火車公司的優惠信息！有時候他們會推出限時促銷活動，抓住機會就能省不少錢。<br/>總之，這些小秘訣可以幫助你在歐洲旅行時省下一筆不小的開支，讓你的旅程更加愉快和輕鬆！
              </div>
              <div className="button-group">
                <button className="icon-button" onClick={() => routeChange()}><img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/93f6692886fef5c4e581a6d50dc8918be3bc625cacd01ff9a3aa406d436bc2cb?"
                  // className="image-wrapper"
                /></button>
                <button className="icon-button" onClick={() => routeChange()}><img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5a756b58d142cb690b645513a52d30b8b67dfb9c2d2d8b9b14f5e59e54c55c5?"
                  // className="image-wrapper"
                /></button>
                <button className="icon-button" onClick={() => routeChange()}><img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b5dfa48625bbd19eba35a880219025866e4486fd2d4895d0ab7a334a9ce5e40?"
                  // className="image-wrapper"
                /></button>
              </div>
            </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
