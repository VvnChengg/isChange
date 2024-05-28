import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StartPrivateButton from './StartPrivateButton';
import Popup from './Popup'
import './StartPrivate.css';
import { useNavigate } from 'react-router-dom';
// 需要 receiver_id 及 receiver_name
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';




// 把按鈕跟 popup 混合
const StartPrivate = ( {receiver_id, receiver_name} ) => {
  const intl = useIntl();
  const navigate = useNavigate();
  // 需要 receiver_id 及 receiver_name
  // const receiver_id = ';
  // const receiver_name = '';

  const [isOpen, setIsOpen] = useState(false);
  const [ischatId, setchatId] = useState('');

  const hostname = process.env.REACT_APP_API_HOSTNAME;
  const token = window.localStorage.getItem('access_token');
  useEffect(() => {
      if(receiver_id){
        axios.get(`${hostname}/chat/check/${receiver_id}` ,{headers: {
          'Authorization':  `Bearer ${token}`
      }})
        .then(response => {
          setchatId(response.data.chat_id);
        })     
          .catch(error => {
            console.error('API 請求失敗:', error);
          });
    }
  }, [receiver_id, hostname]);

  useEffect(() => {
    //console.log(ischatId);
  }, [ischatId]);

  const togglePopup = () => {
    if(token){
      if (ischatId === null) { // 檢查是否已有chat
        setIsOpen(!isOpen);
      } else {
        navigate('/chatroom/'+ischatId);
      }
    } else{
      toast.error(`${intl.formatMessage({id: 'token.pleaseLogIn'})}`);
    }
  };

  return (
    <div>
      <StartPrivateButton onClick={togglePopup} />
      <Popup other_id={receiver_id} other_name={receiver_name} isOpen={isOpen} onClose={togglePopup} direction ={'Invite'} />
      {/* <Popup other_id={'660bbad71dd21a4850f209c'} other_name={'testing'} isOpen={isOpen} onClose={togglePopup} direction ={'Invite'} /> */}
    </div>
  );
};

export default StartPrivate;