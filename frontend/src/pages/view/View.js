import React, { useState, useEffect } from 'react';
import viewStyles from '../../styles/View.module.css';
import ViewMemberSelfIntro from './ViewMemberSelfIntro';
import ViewMemberPost from './ViewMemberPost';
import ViewMemberInfo from './ViewMemberInfo';
import { viewApi } from '../../api/viewApi';
import { useToken } from '../../hooks/useToken';


const View = () => {
  const [username, setUsername] = useState('');
  const [school, setSchool] = useState('');
  const [photo, setPhoto] = useState('');
  const [intro, setIntro] = useState('');
  const token = useToken();

  // 先讀取使用者資料
  const getInfo = async () =>{
    const memberInfo = await viewApi.getMember(token);
    // console.log(memberInfo);

    setUsername(memberInfo.username);
    setSchool(memberInfo.exchange_school_name);
    setPhoto(memberInfo.photo);
    setIntro(memberInfo.intro);
  }

  useEffect(() => {
    if(token){
      getInfo();
    }
  }, [token]);

  return (
    <div className={viewStyles.isChange}>
      <ViewMemberInfo photo={photo} username={username} school={school}/>
      <ViewMemberSelfIntro intro={intro}/>
      <ViewMemberPost />
    </div>
  );
};

export default View;