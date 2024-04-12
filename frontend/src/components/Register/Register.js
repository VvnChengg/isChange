import React, { useState, useRef, Fragment, useEffect } from 'react';
import '../../styles/Register.css';
import { InputWithButton } from './Register-components';

const Register = () => {
    const [email, setEmail] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [emailRegistered, setEmailRegistered] = useState(false);

    const [isSending, setIsSending] = useState(false);
    const [countdown, setCountdown] = useState(45);

    const [verificationCode, setVerificationCode] = useState(''); // 驗證碼
    const [verificationPass, setVerificationPass] = useState(false); // 驗證碼是否通過
    const [shouldCheckVeri, setShouldCheckVeri] = useState(false); // 是否應該檢查驗證碼
    const [veriHint, setVeriHint] = useState(''); // 驗證碼錯誤提示

    const [passWord, setPassword] = useState('');
    const [passWord_confirm, setPassword_confirm] = useState('');
    const [isPassWordSame, setIsPassWordSame] = useState(true); // 密碼是否相同
    const [passWordRuleMatched, setPassWordRuleMatched] = useState(true);

    const [username, setUserName] = useState('');
    const [shouldCheck, setShouldCheck] = useState(false);
    const [usernameRegistered, setUsernameRegistered] = useState(false);

    const [file, setFile] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);

    const [userSchoolName, setUserSchoolname] = useState('');
    const [userSchoolNameError, setUserSchoolNameError] = useState(false);


    // 處理輸入框的焦點
    const handleInputFocus = () => {
        setIsFocused(true);
    };
    // 處理輸入框失去焦點
    const handleInputBlur = () => {
        setIsFocused(false);
    };



    // 檢查email是否已被註冊
    const checkEmailInDatabase = (email) => {
        // 在這裡從資料庫檢查email是否已被註冊
        // true => ok
        // false => 已被註冊
        return false; // 模拟未被注册的情况
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    const SentMail = () => {
        // 檢查此email是否已被註冊
        let registered = checkEmailInDatabase(email);
        setEmailRegistered(registered);

        //若已被註冊則不寄送，並彈出視窗
        if (emailRegistered) {
            alert('此信箱已被註冊');
        } else {
            sendMail(email);
            // console.log('寄送驗證信:', email);
        }
    };

    const sendMail = (email) => {
        // 在這裡寄送驗證信

        setIsSending(true);
        setCountdown(45);

        const intervalId = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        setTimeout(() => {
            setIsSending(false);
            clearInterval(intervalId);
        }, 45000);
    };

    useEffect(() => {
        if (countdown === 0) {
            setCountdown(45);
        }
    }, [countdown]);




    const handleVerificationCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const checkVerificationInDatabase = () => {
        // 在這裡檢查驗證碼是否正確
        // true => ok
        // false => 錯誤
        return true; // 模拟驗證碼正確的情况
    }

    const checkVerification = async () => {
        // 檢查驗證碼是否正確
        let pass = await checkVerificationInDatabase(verificationCode);
        setVerificationPass(pass);
        setShouldCheckVeri(true);
    }

    useEffect(() => {
        if (shouldCheckVeri) {
            if (!verificationPass) {
                setVeriHint('驗證碼錯誤');
            }
        }
    }, [verificationPass, shouldCheckVeri]);

    const checkUserNameInDatabase = () => {
        // true => ok
        // false => 已被註冊
        return false; // 模拟未被注册的情况
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


    // 檢查使用者名稱是否已被註冊
    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
        CheckUserName();
    }


    const CheckUserName = async () => {
        let registered = await checkUserNameInDatabase(username);
        setUsernameRegistered(registered);
        setShouldCheck(true);
    }

    useEffect(() => {
        if (!usernameRegistered) {
            console.log('名稱可用:', username);
        }
        setShouldCheck(false);
    }, [usernameRegistered, shouldCheck]);



    // 上傳文件
    // const handleFileUpload = (e) => {
    //     setFile(e.target.files[0]);
    //     if (file) {
    //         console.log('已選擇文件:', file);
    //         // 進行文件上傳的其他操作
    //     }
    // };

    // 檢查交換學校是否為空
    const handleUserSchoolNameChange = (e) => {
        setUserSchoolname(e.target.value);
        setUserSchoolNameError(e.target.value);
        if (e.target.value === '') {
            setUserSchoolNameError(true);
        } else {
            setUserSchoolNameError(false);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // 在這裡處理表單提交的邏輯，包括收集所有狀態中的資料並將其發送到後端
        if (isPassWordSame || !verificationPass || !usernameRegistered || userSchoolNameError) {
            alert('請確認表單資料');
        }
        console.log('表單已提交:', { email, passWord, passWord_confirm, username, file });
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="email" className="login-form__label">電子信箱</label>
                <div className="login-form__input-group">
                    <div className={`input-container ${isFocused ? 'focused' : ''}`}>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            className="login-form__input"
                            placeholder="請輸入電子信箱"
                            required
                        />
                        {emailRegistered && <span className="registered-text">已被註冊</span>}
                    </div>
                    <button
                        onClick={SentMail}
                        className={`login-form__button send-button ${isSending ? 'disabled' : ''}`}
                        disabled={isSending}
                    >
                        {isSending ? `再 ${countdown} 秒可以重新寄送` : '寄送驗證信'}
                    </button>
                </div>

                {isSending && (
                    <Fragment>
                        <label htmlFor="verificationCode" className="login-form__label">驗證碼</label>
                        <div className="login-form__input-group">
                            <div className={`input-container ${isFocused ? 'focused' : ''}`}>
                                <input
                                    type="text"
                                    id="verificationCode"
                                    value={verificationCode}
                                    onChange={handleVerificationCodeChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    className="login-form__input"
                                    placeholder="請輸入驗證碼"
                                    required
                                />
                                {!verificationPass && <span className="registered-text"> {veriHint} </span>}
                            </div>
                            <button onClick={checkVerification} className={`login-form__button send-button ${verificationPass ? 'disabled' : ''}`}
                                disabled={verificationPass}>
                                {verificationPass ? `已驗證` : '驗證'}
                            </button>
                        </div>
                    </Fragment>
                )}
                <label htmlFor="password-input" className="login-form__label">輸入密碼</label>
                <div className="login-form__input-group">
                    <div className={`input-container ${isFocused ? 'focused' : ''}`}>
                        <input
                            type="password"
                            id="password-input"
                            value={passWord}
                            onChange={handlePasswordChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            className="login-form__input"
                            placeholder="請輸入密碼"
                            required
                        />
                        {!passWordRuleMatched && <span className="registered-text">密碼須符合...條件</span>}
                    </div>
                </div>

                <label htmlFor="password-confirm-input" className="login-form__label">確認密碼</label>
                <div className="login-form__input-group">
                    <div className={`input-container ${isFocused ? 'focused' : ''}`}>
                        <input
                            type="password"
                            id="password-confirm-input"
                            value={passWord_confirm}
                            onChange={handlePasswordConfirmChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            className="login-form__input"
                            placeholder="再輸入密碼"
                            required
                        />
                        {!isPassWordSame && <span className="registered-text">密碼不同</span>}
                    </div>
                </div>

                <label htmlFor="username" className="login-form__label">使用者名稱</label>
                <div className="login-form__input-group">
                    <div className={`input-container ${isFocused ? 'focused' : ''}`}>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUserNameChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            className="login-form__input"
                            placeholder="請輸入使用者名稱"
                            required
                        />
                        {usernameRegistered && <span className="registered-text">該名稱已被使用</span>}
                    </div>
                </div>

                <label htmlFor="username" className="login-form__label">交換學校</label>
                <div className="login-form__input-group">
                    <div className={`input-container ${isFocused ? 'focused' : ''}`}>
                        <input
                            type="password"
                            id="userSchoolName"
                            value={userSchoolName}
                            onChange={handleUserSchoolNameChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            className="login-form__input"
                            placeholder="輸入交換學校"
                            required
                        />
                        {/* {userSchoolNameError && <span className="registered-text">交換學校不可為空</span>} */}
                    </div>
                </div>
                {/* 這一區為學生證上傳, 但討論結果為暫時不需要,先註解 */}
                {/* <label htmlFor="student-id" className="login-form__label">學生認證</label>
                <div className="login-form__input-group">
                    <div className={`input-container ${isFocused ? 'focused' : ''}`}>
                        <input
                            type="file"
                            id="student-id"
                            onChange={handleFileUpload}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            className="login-form__input"
                        />
                        {fileUploaded && <span className="registered-text">檔案已上傳</span>}
                    </div>
                </div> */}

                <br />
                <div className="submit-container">
                    <button type="submit" className="login-form__button">
                        送出表單
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;