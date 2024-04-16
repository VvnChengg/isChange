import React, { useState, useEffect } from 'react';
import viewStyles from '../../styles/View.module.css';
import { EditProfileButton } from './View-style';
import { useNavigate } from 'react-router-dom'; // 匯入 useHistory 鉤子

// 包含使用者的大頭貼、使用者名稱、學校名稱
const ViewMemberInfo = ({photo, username, school}) => {
  const [image, setImage] = useState('/icons/profile.png');
  const navigate = useNavigate();

  useEffect(() => {
    if(photo){
      setImage(photo);
    }
  }, [photo]);

  function handleEditProfileClick(){
      navigate('/edit');
  }

  return (
    <div className={viewStyles.profile}>
      <div className={viewStyles.profileLeft}>
        <img src={image || "/icons/profile.png"} alt='Profile' onError={(e) => { e.target.onerror = null; e.target.src="/icons/profile.png"; }} />
        <p>{username}</p>
        <p>{school}</p>
      </div>
      <div className={viewStyles.profileRight}>
        <EditProfileButton className={viewStyles.viewbutton} onClick={handleEditProfileClick}/>
      </div>
    </div>
  );
};

export default ViewMemberInfo;