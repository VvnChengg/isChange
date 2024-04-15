import React, { useState, useEffect } from 'react';
import viewStyles from '../../styles/View.module.css';
import ViewMemberSelfIntro from './ViewMemberSelfIntro';
import ViewMemberPost from './ViewMemberPost';
import ViewMemberInfo from './ViewMemberInfo';
import { viewApi } from '../../api/viewApi';


const View = () => {

  const [username, setUsername] = useState('');
  const [school, setSchool] = useState('');
  const [photo, setPhoto] = useState('');
  const [intro, setIntro] = useState('');

  const getInfo = async () =>{
    // use viewApi.getMember to get member info
    const token =  localStorage.getItem('access_token');
    const memberInfo = await viewApi.getMember(token);
    console.log(memberInfo);

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