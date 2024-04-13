import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StartPrivateButton from './StartPrivateButton';
import Popup from './Popup'
import './StartPrivate.css';





const StartPrivate = () => {
  // 需要 receiver_id 及 receiver_name
  const receiver_id = "example2";
  const receiver_name = 'WW'


  const [isOpen, setIsOpen] = useState(false);
  const [ischatId, setchatId] = useState("");

  const hostname = 'http://localhost:3000/api';
  useEffect(() => {
    // 發送 API 請求
    axios.get(`${hostname}/chat/check`, { params: { receiver_id: receiver_id } })
      .then(response => {
        // 設置獲取到的數據
        //console.log(response.data);
        setchatId(response.data.chat_id);
        
      })
      .catch(error => {
        console.error('API 請求失敗:', error);
      });
  }, []);

  const togglePopup = () => {
    if (ischatId === "") { // 檢查是否為空
      setIsOpen(!isOpen);
    } else {
      // 開啟該聊天室
    }
  };

  return (
    <div>
      <StartPrivateButton onClick={togglePopup} />
      <Popup receiver={receiver_id} receiver_name={receiver_name} isOpen={isOpen} onClose={togglePopup} />
    </div>
  );
};

export default StartPrivate;