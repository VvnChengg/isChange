import React, { Fragment, useState, useEffect } from 'react';
import { registerApi } from '../../api/registerApi';
import { editApi } from '../../api/editApi';

// 編輯基本資料的元件
export const BasicInfoEdit = ({ showBasicInfo, handleClose, isFocused, handleInputFocus, handleInputBlur, username, school }) => {
    const [userName, setUserName] = useState('');
    const [userNameRegistered, setUserNameRegistered] = useState(false);
    const [userSchoolName, setUserSchoolName] = useState('');
    const [debounceTimeoutId, setDebounceTimeoutId] = useState(null);

    useEffect(() => {
        setUserName(username);
    }, [username]);

    useEffect(() => {
        setUserSchoolName(school);
    }, [school]);

    // 檢查使用者名稱是否已被註冊
    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }


    useEffect(() => {
        if (debounceTimeoutId) {
            clearTimeout(debounceTimeoutId);
        }
    
        if (username) {
            const id = setTimeout(CheckUserName, 500); // Wait for 500ms before calling CheckUserName
            setDebounceTimeoutId(id);
        }
    }, [userName]);


    // 檢查使用者名稱是否已被註冊
    const checkUserNameInDatabase = async () => {
        // true => ok
        // false => 已被註冊
        try {
            const email = localStorage.getItem('email');
            const data = await registerApi.verifyUsername(userName, email);
            // console.log(data);

            if (data.status === 'success') {
                setUserNameRegistered(false);
                return false;
            } else {
                setUserNameRegistered(true);
                return true;
            }        
        } catch(error) {
            if (error.response) {
                console.log(error.response.data);
                // error.response.data 將會是你的錯誤訊息物件，例如：
                // { status: "failed", message: "使用者名稱已有人使用，請更換其他名稱" }
                if (error.response.data.status === 'failed') {
                    setUserNameRegistered(true);
                } else {
                    setUserNameRegistered(false);
                }
            } else if (error.request) {
                console.error('No response was received', error.request);
            } else {
                console.error('Error setting up the request', error.message);
            }
            console.error('Error config:', error.config);
        };
    }

    const CheckUserName = async () => {
        await checkUserNameInDatabase(username);
    }

    const handleUserSchoolNameChange = (e) => {
        setUserSchoolName(e.target.value);
    }

    // 儲存基本資料
    const handleSubmitBasicInfo = async (e) => {
        e.preventDefault();
        // console.log('表單已提交:', { userName, userSchoolName });

        try{
            const token = localStorage.getItem('access_token');
            const data = await editApi.editBasicInfo(userName, userSchoolName, token);
            if(data.status === 'success'){
                alert(`${data.message}`);
                handleClose();
            }
        }catch(error){
            console.error(error);
            alert(`更新失敗`);
        }
    }

    return (
        <Fragment>
            {showBasicInfo && (
                <div className='floating-div'>
                    <button onClick={handleClose} className="close-button">X</button>
                    <form className="register-form" onSubmit={handleSubmitBasicInfo}>
                        <label htmlFor="username" className="login-form__label">使用者名稱</label>
                        <div className="login-form__input-group">
                            <div className={`input-container ${isFocused ? 'focused' : ''}`}>
                                <input
                                    type="text"
                                    id="username"
                                    value={userName}
                                    onChange={handleUserNameChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    className="login-form__input"
                                    placeholder="請輸入使用者名稱"
                                    required
                                />
                                {userNameRegistered && userName !== username && <span className="registered-text">該名稱已被使用</span>}
                            </div>
                        </div>

                        <label htmlFor="userSchoolName" className="login-form__label">交換學校</label>
                        <div className="login-form__input-group">
                            <div className={`input-container ${isFocused ? 'focused' : ''}`}>
                                <input
                                    type="text"
                                    id="userSchoolName"
                                    value={userSchoolName}
                                    onChange={handleUserSchoolNameChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    className="login-form__input"
                                    placeholder="輸入交換學校"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="login-form__button" disabled={userName === username && userSchoolName === school}>
                            確認
                        </button>
                    </form>
                </div>
            )}
        </Fragment>
    );
}