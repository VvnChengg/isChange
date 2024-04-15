import React, { Fragment, useState, useEffect } from 'react';

export const BasicInfoEdit = ({ showBasicInfo, handleClose, isFocused, handleInputFocus, handleInputBlur }) => {
    const [userName, setUserName] = useState('');
    const [shouldCheckName, setShouldCheckName] = useState(false);
    const [userNameRegistered, setUserNameRegistered] = useState(false);
    const [userSchoolName, setUserSchoolName] = useState('');
    const [userSchoolNameError, setUserSchoolNameError] = useState(false);


    // 檢查使用者名稱是否已被註冊
    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
        CheckUserName();
    }

    const CheckUserName = async () => {
        let registered = await checkUserNameInDatabase(userName);
        setUserNameRegistered(registered);
        setShouldCheckName(true);
    }

    const checkUserNameInDatabase = () => {
        // true => ok
        // false => 已被註冊
        return false; // 模拟未被注册的情况
    }


    useEffect(() => {
        if (!userNameRegistered) {
            console.log('名稱可用:', userName);
        }
        setShouldCheckName(false);
    }, [userNameRegistered, shouldCheckName]);

    const handleUserSchoolNameChange = (e) => {
        setUserSchoolName(e.target.value);
    }

    const handleSubmitBasicInfo = (e) => {
        e.preventDefault();
        if (userNameRegistered) {
            alert('此名稱已被使用');
            return;
        }
        console.log('表單已提交:', { userName, userSchoolName });
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
                                {userNameRegistered && <span className="registered-text">該名稱已被使用</span>}
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
                        <button type="submit" className="login-form__button">
                            確認
                        </button>
                    </form>
                </div>
            )}
        </Fragment>
    );
}