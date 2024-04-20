import React, { useState, useEffect } from 'react';
import viewStyles from '../../styles/View.module.css';
import ViewMemberSelfIntro from './ViewMemberSelfIntro';
import ViewMemberPost from './ViewMemberPost';
import ViewMemberInfo from './ViewMemberInfo';
import { viewApi } from '../../api/viewApi';
import { useNavigate } from 'react-router-dom'; // 匯入 useHistory 鉤子


const View = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [school, setSchool] = useState('');
  const [photo, setPhoto] = useState('');
  const [intro, setIntro] = useState('');

  // 先讀取使用者資料
  const getInfo = async () =>{

    // 判斷 token 是否過期
    const now = new Date();
    const expiryTime = localStorage.getItem('expiry_time');
    if(now.getTime() > Number(expiryTime)){
      localStorage.clear();
      navigate('/login');
      return
    }

    // use viewApi.getMember to get member info
    const token =  localStorage.getItem('access_token');

    const memberInfo = await viewApi.getMember(token);
    // console.log(memberInfo);

    setUsername(memberInfo.username);
    setSchool(memberInfo.exchange_school_name);
    setPhoto(memberInfo.photo);
    setIntro(memberInfo.intro);
  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className={viewStyles.isChange}>
      <ViewMemberInfo photo={photo} username={username} school={school}/>
      <ViewMemberSelfIntro intro={intro}/>
      <ViewMemberPost />
    </div>
  );
};

export default View;