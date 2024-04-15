import React from 'react';
import viewStyles from '../../styles/View.module.css';
import ViewMemberSelfIntro from './ViewMemberSelfIntro';
import ViewMemberPost from './ViewMemberPost';

const View = () => {
  return (
    <div className={viewStyles.isChange}>
        <div className={viewStyles.profile}>
            <div className={viewStyles.profileLeft}>
                <img src="avatar.png" alt="個人頭像" />
                <p>example</p>
                <p>加拿大不列頗留憐比亞溫哥華拉僧佛學院</p>
                <p>溫哥華 &lt; 國旗&gt;</p>
            </div>
            <div className={viewStyles.profileRight}>
            <button className={viewStyles.viewbutton}>追蹤</button>
            </div>
        </div>
        <ViewMemberSelfIntro />
        <ViewMemberPost/>        
    </div>
  );
};

export default View;