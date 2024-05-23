import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

import viewStyles from '../../styles/View.module.css';
import ViewMemberSelfIntro from './ViewMemberSelfIntro';
import ViewMemberPost from './ViewMemberPost';
import ViewMemberInfo from './ViewMemberInfo';

import { viewApi } from '../../api/viewApi';
import { useToken } from '../../hooks/useToken';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';


export const ViewWithoutUid = () => {
  const [username, setUsername] = useState('');
  const [school, setSchool] = useState('');
  const [photo, setPhoto] = useState('');
  const [intro, setIntro] = useState('');
  const [student_veri, setStudentVeri] = useState(false);
  const token = useToken();

  const [isLoading, setIsLoading] = useState(true);

  const intl = useIntl();

  // 先讀取使用者資料
  const getInfo = async () =>{
    const memberInfo = await viewApi.getMember(token);
    // console.log(memberInfo);

    setUsername(memberInfo.username);
    setSchool(memberInfo.exchange_school_name);
    setPhoto(memberInfo.photo);
    setIntro(memberInfo.intro);
    setStudentVeri(memberInfo.student_verification);
    setIsLoading(false);
  }

  useEffect(() => {
    if(token){
      getInfo();
    }
  }, [token]);

  if (isLoading) {
    return <Spin />;
}

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
  const [other_uid, setOtherUid] = useState('');
  const { other_username } = useParams();
  const user_id = localStorage.getItem('user_id');

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const intl = useIntl();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [postLoading, setPostLoading] = useState(true);

  // 先讀取使用者資料
  const getOtherMemberInfo = async () =>{
    const memberInfo = await viewApi.getOtherMember(other_username);
    // console.log(memberInfo);

    setUsername(memberInfo.username);
    setSchool(memberInfo.exchange_school_name);
    setPhoto(memberInfo.photo);
    setIntro(memberInfo.intro);
    setStudentVeri(memberInfo.student_verification);
    setOtherUid(memberInfo._id);
    // console.log(memberInfo._id);
    setIsLoading(false);
  }

  async function getPostList(){
    try{
      const data = await viewApi.getOtherMemberPosts(other_username);
      if(data){
          setPosts(data.result);
      }else{
          toast.error(intl.formatMessage('view.getPostFailed'));
      }
    }catch(err){
      setPosts([]);
      toast.error(intl.formatMessage('view.getPostFailed'));
    }
    setPostLoading(false);
  }


  useEffect(() => {
    if(other_username){
      getOtherMemberInfo();
      getPostList();
    }
  }, [other_username]);

  useEffect(() => {
    if(other_uid === user_id){
      navigate(`/member`);
    }
  }, [other_uid]);


  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className={viewStyles.isChange}>
      <div className={viewStyles.buttonContainer}>
        <button onClick={() => setPage(1)} className={viewStyles.changePageButton}>
          {intl.formatMessage( {id:'view.viewIntro'} )}
        </button>
        <button onClick={() => setPage(2)} className={viewStyles.changePageButton}>
          {intl.formatMessage( {id:'view.viewPost'} )}
        </button>
      </div>      
    <ViewMemberInfo 
      photo={photo} 
      username={username} 
      school={school} 
      student_veri={student_veri} 
      other_username={other_username}
      other_uid={other_uid}
      />
      
      {page === 1 && (
        <ViewMemberSelfIntro intro={intro}/>
      )}

      {page === 2 && (
        <ViewMemberPost 
          posts={posts}
          postLoading={postLoading}
        />
      )}
    </div>
  );
}