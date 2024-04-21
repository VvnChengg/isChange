import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StartPrivateButton from './StartPrivateButton';
import Popup from './Popup'
import './StartPrivate.css';
import { useNavigate } from "react-router-dom";
// 需要 receiver_id 及 receiver_name





// 把按鈕跟 popup 混合
const StartPrivate = () => {
  const navigate = useNavigate();
  // 需要 receiver_id 及 receiver_name
  //const receiver_id = ;
  //const receiver_name = ;


  const [isOpen, setIsOpen] = useState(false);
  const [ischatId, setchatId] = useState("");

  const hostname = process.env.REACT_APP_API_HOSTNAME;
  
  useEffect(() => {
    const userId = window.localStorage.getItem('user_id');
    // console.log(userId)
    const token = window.localStorage.getItem('access_token');
    // 發送 API 請求
    axios.get(`${hostname}/chat/check/660bbad71dd21a48510f209c` ,{headers: {
      'Authorization':  `Bearer ${token}`
  }})
    .then(response => {
      // 數據取得
      setchatId(response.data.chat_id);
    })     
      .catch(error => {
        console.error('API 請求失敗:', error);
      });
  }, []);
  //console.log(ischatId)
  const togglePopup = () => {
    if (ischatId === null) { // 檢查是否已有chat
      setIsOpen(!isOpen);
    } else {
      navigate("/chatroom/"+ischatId);
    }
  };

  return (
    <div>
      <StartPrivateButton onClick={togglePopup} />
      <Popup receiver={'660bbad71dd21a4850f209c'} receiver_name={'testing'} isOpen={isOpen} onClose={togglePopup} />
    </div>
  );
};

export default StartPrivate;