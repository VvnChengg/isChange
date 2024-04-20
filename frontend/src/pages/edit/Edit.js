import React, { useState, useEffect, useRef } from 'react';
import editStyles from '../../styles/Edit.module.css';
import { PassWordEdit } from './PassWordDiv';
import { BasicInfoEdit } from './BasicInfoDiv';
import { SelfInfo } from './SelfInfo';
import { ImageUploadDiv } from './ImageDiv';
import { viewApi } from '../../api/viewApi';
import { useNavigate } from 'react-router-dom';
import Button from "../../components/Button";

const Edit = () => {
    const navigate = useNavigate();
    const [showPasswordDiv, setShowPasswordDiv] = useState(false);
    const [showBasicInfoDiv, setShowBasicInfoDiv] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const [introText, setIntroText] = useState('');

    const [username, setUsername] = useState('');
    const [school, setSchool] = useState('');
    const [photo, setPhoto] = useState('');

    const getInfo = async () => {
        // use viewApi.getMember to get member info
        const token = localStorage.getItem('access_token');

        // if no token, navigate to login page
        if (!token) {
            navigate('/login');
            return;
        }

        const memberInfo = await viewApi.getMember(token);
        // console.log(memberInfo);

        setUsername(memberInfo.username);
        setSchool(memberInfo.exchange_school_name);
        setPhoto(memberInfo.photo);
        setIntroText(memberInfo.intro);
        // console.log("photo:"+memberInfo.photo);
    }

    useEffect(() => {
        getInfo();
    }, []);
    


    // 處理輸入框的焦點
    const handleInputFocus = () => {
        setIsFocused(true);
    };
    // 處理輸入框失去焦點
    const handleInputBlur = () => {
        setIsFocused(false);
    };



    const handleShowBasicInfoDivClose = () => {
        setShowBasicInfoDiv(false);
    }


    const handlePassWordDivClose = () => {
        setShowPasswordDiv(false);
    }

    const handleSubmitImage = () => {
        console.log('上傳圖片:', photo);
    }

    const handleSubmitIntro = () => {
        if (introText.length > 200) {
            alert('自我介紹只能少於200字');
            return;
        }
        console.log('表單已提交:', { introText });

    }

    const handleSubmitStore = () => {
        handleSubmitIntro()
        // handleSubmitImage()
    }

    return (
        <div className={editStyles.editContainer}>
            <div className={editStyles.editForm}>
                <div className={editStyles.section1}>
                    <div className={editStyles.section1Left}>
                        <ImageUploadDiv 
                        photo={photo} 
                        setPhoto={setPhoto} />
                    </div>

                    <div className={editStyles.section1Right}>
                        <div className={editStyles.sectionHeading}>基本資料修改</div>
                        <div className={editStyles.actionButtonsDiv}>
                        <Button
                            style={{ marginBottom: '20px' }}
                            onClick={() => setShowPasswordDiv(true)}
                            // text={intl.formatMessage({ id: 'login.login' })}
                            text="修改密碼"
                        />

                        <Button
                            // style={{ width: '100%' }}
                            onClick={() => setShowBasicInfoDiv(true)}
                            // text={intl.formatMessage({ id: 'login.login' })}
                            text="修改名稱學校"
                        />
                        </div>
                    </div>

                    <BasicInfoEdit
                        showBasicInfo={showBasicInfoDiv}
                        isFocused={isFocused}
                        handleClose={handleShowBasicInfoDivClose}
                        handleInputFocus={handleInputFocus}
                        handleInputBlur={handleInputBlur}
                        username={username}
                        school={school}
                    />

                    <PassWordEdit
                        showPasswordDiv={showPasswordDiv}
                        handleClose={handlePassWordDivClose}
                        isFocused={isFocused}
                        handleInputFocus={handleInputFocus}
                        handleInputBlur={handleInputBlur}
                    />

                </div>
                <div className={editStyles.section2}>
                    <SelfInfo setIntroText={setIntroText} introText={introText} />
                </div>
            </div>
        </div>
    );
}

export default Edit;