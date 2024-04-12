import React, { useState, useEffect } from 'react';
import '../../styles/Edit.css';
import { UserIcon } from './Edit-style';
import { PassWordEdit } from './Edit-components';

const Edit = () => {
    const [showPasswordDiv, setShowPasswordDiv] = useState(false);
    const [isFocused, setIsFocused] = useState(false);


    const [OriginPassWord, setOriginPassWord] = useState(''); // 之後要補原密碼的判斷
    const [isOriginPassWordCorrect, setIsOriginPassWordCorrect] = useState(true); // 之後要補原密碼的判斷
    const [passWord, setPassword] = useState('');
    const [passWord_confirm, setPassword_confirm] = useState('');
    const [isPassWordSame, setIsPassWordSame] = useState(true); // 密碼是否相同
    const [passWordRuleMatched, setPassWordRuleMatched] = useState(true);

    const handleClose = () => {
        setShowPasswordDiv(false);
    };

    const handleOriginPassWordChange = (e) => {
        setOriginPassWord(e.target.value);
    }

    const CheckOriginPassWord = () => {
        return true;
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        CheckpassWordRule();
    }

    const CheckpassWordRule = () => {
        // 之後要補密碼規則
        // 密碼長度至少為 8
        if (passWord.length < 8) {
            setPassWordRuleMatched(false);
            return;
        }
        setPassWordRuleMatched(true);
    }

    const CheckpassWordSame = () => {
        if (passWord === passWord_confirm) {
            setIsPassWordSame(true);
        } else {
            setIsPassWordSame(false);
        }
    }

    useEffect(() => {
        CheckpassWordSame();
    }, [passWord_confirm]);

    const handlePasswordConfirmChange = (e) => {
        setPassword_confirm(e.target.value);
    }


    const handleSubmitPassWord = (e) => {
        e.preventDefault();
        if(!CheckOriginPassWord() || !isPassWordSame || !passWordRuleMatched){
            setIsOriginPassWordCorrect(false);
            alert("原始密碼不正確")
            return;
        }
        console.log('表單已提交:', { passWord});
    }



    return (
        <div className="edit-container">
            <div className="edit-form">
                <div className="section-1">
                    <div className="section-1-left">
                        <div className="section-heading">頭像編輯</div>
                        <div className="profile-picture">
                            <UserIcon src="profile" />
                        </div>
                        <div className="edit-button">
                            <button>上傳圖片</button>
                        </div>
                    </div>


                    <PassWordEdit
                        setShowPasswordDiv={setShowPasswordDiv}
                        showPasswordDiv={showPasswordDiv}
                        handleClose={handleClose}
                        isFocused={isFocused}
                        passWord={passWord}
                        handlePasswordChange={handlePasswordChange}
                        handlePasswordConfirmChange={handlePasswordConfirmChange}
                        passWord_confirm={passWord_confirm}
                        isPassWordSame={isPassWordSame}
                        passWordRuleMatched={passWordRuleMatched}
                        handleSubmitPassWord = {handleSubmitPassWord}
                    />

                </div>
                <div className="section-2">
                    <div className="section-heading">自我介绍</div>
                    <textarea className="self-intro" placeholder="限兩百字以內"></textarea>
                    <button>儲存</button>
                </div>
            </div>
        </div>
    );
}

export default Edit;