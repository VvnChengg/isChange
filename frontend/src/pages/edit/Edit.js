import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Edit.css';
import { UserIcon } from './Edit-style';
import { PassWordEdit } from './PassWordDiv';
import { BasicInfoEdit } from './BasicInfoDiv';
import { SelfInfo } from './SelfInfo';
import { ImageUploadDiv } from './ImageDiv';

const Edit = () => {
    const [showPasswordDiv, setShowPasswordDiv] = useState(false);
    const [showBasicInfoDiv, setShowBasicInfoDiv] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const [imageURL, setImageURL] = useState(null);
    const [introText, setIntroText] = useState('');
    


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
        console.log('上傳圖片:', imageURL);
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
        handleSubmitImage()
    }

    return (
        <div className="edit-container">
            <div className="edit-form">
                <div className="section-1">
                    <div className="section-1-left">
                        <ImageUploadDiv setImageURL={setImageURL}/>
                    </div>

                    <div className="section-1-right">
                        <div className="section-heading">基本資料修改</div>
                        <div className="action-buttons">
                            <button onClick={() => setShowPasswordDiv(true)}>修改密碼</button>
                            <button onClick={() => setShowBasicInfoDiv(true)}>修改名稱學校</button>
                        </div>
                    </div>

                    <BasicInfoEdit
                        showBasicInfo={showBasicInfoDiv}
                        isFocused={isFocused}
                        handleClose={handleShowBasicInfoDivClose}
                        handleInputFocus={handleInputFocus}
                        handleInputBlur={handleInputBlur}
                    />

                    <PassWordEdit
                        showPasswordDiv={showPasswordDiv}
                        handleClose={handlePassWordDivClose}
                        isFocused={isFocused}
                        handleInputFocus={handleInputFocus}
                        handleInputBlur={handleInputBlur}
                    />

                </div>
                <div className="section-2">
                    <SelfInfo setIntroText={setIntroText} introText={introText}/>
                </div>
            </div>
            <button onClick={handleSubmitStore}>儲存</button>
        </div>
    );
}

export default Edit;