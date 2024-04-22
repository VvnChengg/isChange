import React, {useEffect, useState} from 'react';
import './shareToDelete-style.css';

import Post from '../../components/Post';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';

export default function MyComponent() {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/'; 
    navigate(path);
  };
  const routeChangeToPublished = () =>{ 
    let path = '/post/published'; 
    navigate(path);
  };
  const routeChangeToFind = () =>{ 
    let path = '/post/find'; 
    navigate(path);
  };
  const routeChangeToCreate = () =>{ 
    let path = '/post/create'; 
    navigate(path);
  };
  const routeChangeToToEdit = () =>{ 
    let path = '/post/to-edit'; 
    navigate(path);
  };
  const routeChangeToToDelete = () =>{ 
    let path = '/post/to-delete'; 
    navigate(path);
  };
  return (
    <div className='container'>
      <div className='edit-content'>
        <div className='left-section'>
          <div className='flex flex-col grow post-content'>
            <div className='blue-rectangle-group'>
              <button className='blue-rectangle' onClick={() => routeChangeToPublished()}>已發布貼文</button>
              <button className='gray-rectangle' onClick={() => routeChangeToFind()}>尋找貼文</button>
            </div>
          </div>
            <button className='delete-button' onClick={() => routeChange()}><img
              loading='lazy'
              src='/icons/basket.png'
            /></button>
            <Post/>
            <button className='delete-button' onClick={() => routeChange()}><img
              loading='lazy'
              src='/icons/basket.png'
            /></button>
            <Post/>
        </div>
        <div className='right-section'>
          <div className='flex flex-col py-5 pr-5 pl-2.5 mx-auto mt-36 w-full rounded-3xl bg-sky-600 bg-opacity-80 max-md:mt-10'>
            <div className='button-container'>
              <button className='blue-button'>
                <img
                  loading='lazy'
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/b0cb189945a8eb1b5251b980af85a97b83f902f561131a62ef6b241205de074b?'
                  className='object-cover'
                  alt='Create Post'
                />
                <span className='text-xl font-bold leading-7' onClick={() => routeChangeToCreate()}>建立貼文</span>
              </button>
              <button className='blue-button'>
                <img
                  loading='lazy'
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/c9421264e6e8cfbeade02b8b178018220efeb1e96004486e15ba139fd54bcf95?'
                  className='object-cover'
                  alt='Edit Post'
                />
                <span className='text-xl font-bold leading-7' onClick={() => routeChangeToToEdit()}>編輯貼文</span>
              </button>
              <button className='blue-button'>
                <img
                  loading='lazy'
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/d6f5c289d2c51390652a5d5eb3bf61a141ba6da687f96b5444e6f26645b8844f?'
                  className='object-cover'
                  alt='Delete Post'
                />
                <span className='text-xl font-bold leading-7' onClick={() => routeChangeToToDelete()}>刪除貼文</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
