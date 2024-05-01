import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import viewStyles from '../../styles/View.module.css';
import ViewMemberSelfIntro from './ViewMemberSelfIntro';
import ViewMemberPost from './ViewMemberPost';
import ViewMemberInfo from './ViewMemberInfo';

import { viewApi } from '../../api/viewApi';
import { useToken } from '../../hooks/useToken';


export const ViewWithoutUid = () => {
  const [username, setUsername] = useState('');
  const [school, setSchool] = useState('');
  const [photo, setPhoto] = useState('');
  const [intro, setIntro] = useState('');
  const [student_veri, setStudentVeri] = useState(false);
  const token = useToken();

  // 先讀取使用者資料
  const getInfo = async () =>{
    const memberInfo = await viewApi.getMember(token);
    // console.log(memberInfo);

    setUsername(memberInfo.username);
    setSchool(memberInfo.exchange_school_name);
    setPhoto(memberInfo.photo);
    setIntro(memberInfo.intro);
    setStudentVeri(memberInfo.student_verification);
  }

  useEffect(() => {
    if(token){
      getInfo();
    }
  }, [token]);

  return (
    <div className={viewStyles.isChange}>
      <ViewMemberInfo photo={photo} username={username} school={school} student_veri={student_veri}/>
      <ViewMemberSelfIntro intro={intro}/>
      {/* <ViewMemberPost /> */}
    </div>
  );
};

export const ViewWithUid = () => {
  const [username, setUsername] = useState('');
  const [school, setSchool] = useState('');
  const [photo, setPhoto] = useState('');
  const [intro, setIntro] = useState('');
  const [student_veri, setStudentVeri] = useState(false);
  const { uid } = useParams();

  // 先讀取使用者資料
  const getOtherMemberInfo = async () =>{
    const memberInfo = await viewApi.getOtherMember(uid);
    // console.log(memberInfo);

    setUsername(memberInfo.username);
    setSchool(memberInfo.exchange_school_name);
    setPhoto(memberInfo.photo);
    setIntro(memberInfo.intro);
    setStudentVeri(memberInfo.student_verification);
  }

  useEffect(() => {
    if(uid){
      getOtherMemberInfo();
    }
  }, [uid]);

  return (
    <div className={viewStyles.isChange}>
      <ViewMemberInfo photo={photo} username={username} school={school} student_veri={student_veri} uid={uid}/>
      <ViewMemberSelfIntro intro={intro}/>
      <ViewMemberPost />
    </div>
  );
}