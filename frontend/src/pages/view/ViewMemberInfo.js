import React, { useState, useEffect } from 'react';
import viewStyles from '../../styles/View.module.css';
import { EditProfileButton } from './View-style';
import { useNavigate } from 'react-router-dom'; // 匯入 useHistory 鉤子
import { useIntl } from 'react-intl';
import Button from '../../components/Button';
import StartPrivate from '../../components/StartPrivate/StartPrivate';

// 包含使用者的大頭貼、使用者名稱、學校名稱
const ViewMemberInfo = ({photo, username, school, student_veri, other_username, other_uid}) => {
  const [image, setImage] = useState('/icons/profile.png');
  const navigate = useNavigate();
  const [showEditImage, setShowEditImage] = useState('');
  const intl = useIntl();
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if(photo){
      setImage(photo);
    }
  }, [photo]);

  useEffect(() => {
    // console.log(other_username, other_uid);
    if(other_username && other_uid){
      setShowEditImage(false);
    }else{
      setShowEditImage(true);
    }
  }, [other_username, other_uid]);

  function handleEditProfileClick(){
      navigate('/edit');
  }

  return (
    <div className={viewStyles.profile}>
      <div className={viewStyles.profileLeft}>
        <img src={image || '/icons/profile.png'} alt='Profile' onError={(e) => { e.target.onerror = null; e.target.src='/icons/profile.png'; }} />
      </div>
      <div className={viewStyles.profileCenter}>
        <p>{username}</p>
        <p>{school}</p> 
        <p>{student_veri ? `${intl.formatMessage({ id: 'view.studentVerified' })}` : `${intl.formatMessage({ id: 'view.studentUnverified'})}`}</p>
      </div>
      <div className={viewStyles.profileRight}>
        {showEditImage && <EditProfileButton className={viewStyles.viewbutton} onClick={handleEditProfileClick}/>}
        { other_username && token &&
          <StartPrivate
            receiver_name={other_username}
            receiver_id={other_uid}
          />
        }
        { !other_username && 
        <Button 
        text={intl.formatMessage({ id: 'view.publishedArticles' })} 
        style={{marginTop: '10px'}}
        onClick={() => navigate('/post/published')}
        />
        }
      </div>
    </div>
  );
};

export default ViewMemberInfo;