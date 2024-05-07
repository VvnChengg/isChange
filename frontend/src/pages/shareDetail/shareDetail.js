import React, {useEffect, useState} from 'react';
import './shareDetail-style.css';
// import { AiOutlineMail } from 'https://esm.sh/react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api';
import { viewApi } from '../../api/viewApi';
import axios from 'axios';
import { useToken } from '../../hooks/useToken';
// import LikeButton from "./likeButton";
import { toast } from 'react-toastify';

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
  const [likes, setLikes] = useState('');
  const [isLiked, setIsLiked] = useState('');

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
    setTitle(postInfo.item.title);
    console.log(postInfo);
    setContent(postInfo.item.content);
    setPhoto(postInfo.item.coverPhoto);
    setLikes(postInfo.item.like_count);
    setIsLiked(postInfo.item.is_liked);
  }

  useEffect(() => {
      getInfo();
  }, []);

  function PressLike() {
    console.log(likes);
    console.log(isLiked);
    
    console.log(pid);
    api.pressLike(pid)
    .then(res => console.log(res))
    .catch(err => console.log(err));
    window.location.reload()
  }

  function PressShare() {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
        .then(() => {
            console.log('URL copied to clipboard:', url);
            toast.success(`${'URL copied to clipboard'}`);
        })
        .catch((error) => {
            console.error('Failed to copy URL:', error);
        });
  }

  // function PressComment() {
  //   console.log(post);
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err));
  // }

  return (
    <div className='flex-container'>
      <div className='detail-container'>
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
                <img
                  loading='lazy'
                  src={photo}
                  className='inserted-figure'
                />
                {content}
              </div>
              <div>
                likes: {likes}
              </div>
              <div className='button-group'>
                {/* <LikeButton
                  likes={likes}
                  is_liked={isLiked}
                  pid={pid} /> */}
                {isLiked === true ?
                <button className='icon-button' onClick={() => PressLike()}><img
                  loading='lazy'
                  src='/icons/heartFilled.png'
                /></button> :
                <button className='icon-button' onClick={() => PressLike()}><img
                  loading='lazy'
                  src='/icons/heartHollow.png'
                /></button>
                }
                {/* <button className='icon-button' onClick={() => routeChange()}><img
                  loading='lazy'
                  src='/icons/commentButton.png'
                /></button> */}
                <button className='icon-button' onClick={() => PressShare()}><img
                  loading='lazy'
                  src='/icons/shareButton.png'
                /></button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
