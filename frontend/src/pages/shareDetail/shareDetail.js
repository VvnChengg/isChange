import React, {useEffect, useState} from 'react';
import './shareDetail-style.css';
// import { AiOutlineMail } from 'https://esm.sh/react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api';
import { viewApi } from '../../api/viewApi';
import axios from 'axios';
import { useToken } from '../../hooks/useToken';

export default function MyComponent() {
  // const [post, setPost] = useState()
  
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/'; 
    navigate(path);
  };

  // const hostname = 'http://localhost:3000/api';
  const [username, setUsername] = useState('');
  const [school, setSchool] = useState('');
  const [headshot, setHeadshot] = useState('');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState('');
  
  const token = useToken();
  const { pid } = useParams();

  const getMemberInfo = async () => {
    const memberInfo = await viewApi.getMember(token);
    setUsername(memberInfo.username);
    setSchool(memberInfo.exchange_school_name);
    setHeadshot(memberInfo.photo);
  }

  useEffect(() => {
    if(token){
        getMemberInfo();
    }
  }, [token]);

  const getInfo = async () => {
    // const pid = "6617996b1067c62b7d704652";
// const pid = "6617996b106";  // 文章ID格式錯誤
// const pid = "6617996b1067c62b7d704650"; // 尚未發布文章
    const postInfo = await api.getPostDetail(pid);
    setTitle(postInfo.article.article_title);
    setContent(postInfo.article.content);
    setPhoto(postInfo.article.article_pic);
  }

  useEffect(() => {
      getInfo();
  }, []);
//   useEffect(() => {
//     if(token){
//         getInfo();
//     }
// }, [token]);



  return (
    <div className='flex-container'>
      <div className='detail-container'>
        {/* <div className='flex-wrapper'> */}
          <div className='left-section'>
            <div className='flex-content'>
              <div className='title-wrapper'>
                <img
                  className='title-img'
                  loading='lazy'
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/d164f973484caa9604cbdaa4c89940ea90cb5dc809b962688855cf182d497f1a?'
                />
                <div className='title-text'>{title}</div>
              </div>
              <div className='share-info'>
                <div className='share-btn'>分享</div>
                <div className='location-info'>
                  <img
                    className='location-img'
                    loading='lazy'
                    src='https://cdn.builder.io/api/v1/image/assets/TEMP/16cdf560b23133dfbbb7f1e9d8a8d9d5dc38c7a3f7de3296dcf78eef77d45513?'
                  />
                  <div className='location-text'>瑞典，斯德哥爾摩</div>
                </div>
              </div>
              <div className='content-info'>
                {content}
                <img
                  loading='lazy'
                  src={photo}
                  className='inserted-figure'
                />
              </div>
              <div className='button-group'>
                <button className='icon-button' onClick={() => routeChange()}><img
                  loading='lazy'
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/93f6692886fef5c4e581a6d50dc8918be3bc625cacd01ff9a3aa406d436bc2cb?'
                  // className='image-wrapper'
                /></button>
                <button className='icon-button' onClick={() => routeChange()}><img
                  loading='lazy'
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/a5a756b58d142cb690b645513a52d30b8b67dfb9c2d2d8b9b14f5e59e54c55c5?'
                  // className='image-wrapper'
                /></button>
                <button className='icon-button' onClick={() => routeChange()}><img
                  loading='lazy'
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/2b5dfa48625bbd19eba35a880219025866e4486fd2d4895d0ab7a334a9ce5e40?'
                  // className='image-wrapper'
                /></button>
              </div>
            </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
