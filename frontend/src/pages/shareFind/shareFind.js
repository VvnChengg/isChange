import React, {useEffect, useState} from 'react';
import './shareFind-style.css';

import Post from '../../components/Post';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';

export default function MyComponent() {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/post/published'; 
    navigate(path);
  };
  return (
    <div className='container'>
      <div className='edit-content'>
        <div className='left-section'>
          <div className='flex flex-col grow post-content'>
            <div className='blue-rectangle-group'>
              <button className='gray-rectangle' onClick={() => routeChange()}>已發布貼文</button>
              <button className='blue-rectangle'>尋找貼文</button>
            </div>
          </div>
            <Post/>
            <Post/>
        </div>
      </div>
    </div>
  );
}
