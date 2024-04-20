// Register.js這塊沒有組件化，之後有空再來改
import React, { useState, Fragment, useEffect } from 'react';
import registerStyles from '../../styles/Register.module.css';
import { loginApi } from '../../api/loginApi';
import { registerApi } from '../../api/registerApi';
import {EmailRegisterInput, NormalRegisterInput} from './RegisterInputs';

const Register = () => {
    const [email, setEmail] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [emailRegistered, setEmailRegistered] = useState(false);

    const [isSending, setIsSending] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const [countdown, setCountdown] = useState(45);

    const [verificationCode, setVerificationCode] = useState(''); // 驗證碼
    const [verificationPass, setVerificationPass] = useState(false); // 驗證碼是否通過
    const [veriHint, setVeriHint] = useState(''); // 驗證碼錯誤提示

    const [passWord, setPassword] = useState('');
    const [passWord_confirm, setPassword_confirm] = useState('');
    const [isPassWordSame, setIsPassWordSame] = useState(true); // 密碼是否相同
    const [passWordRuleMatched, setPassWordRuleMatched] = useState(true);

    const [username, setUserName] = useState('');
    const [debounceTimeoutId, setDebounceTimeoutId] = useState(null);
    const [usernameRegistered, setUsernameRegistered] = useState(false);

    // const [file, setFile] = useState(null);
    // const [fileUploaded, setFileUploaded] = useState(false);

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
    const checkEmailInDatabase = async (email) => {
        // 在這裡從資料庫檢查email是否已被註冊
        // true => 已被註冊
        // false => 尚未被註冊
        try {
            const data = await loginApi.login_or_register(email);
            console.log(data);
            if (data === 1) {
                return true;
            } else {
                alert('請再試一次');
                return null;
            }
        } catch (error) {
            // Handle error
            console.error('Error getting user info:', error);
            return false;
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    const SentMail = async () => {
        // 檢查此email是否已被註冊
        let registered = await checkEmailInDatabase(email);
        setEmailRegistered(registered);
        console.log('registered in SentMail:', registered);

        //若已被註冊則不寄送，並彈出視窗
        if (registered) {
            alert('此信箱已被註冊');
        } else if(registered === false){
            sendMail(email);
            // console.log('寄送驗證信:', email);
        }
    };

    const sendMail = async (email) => {
        // 在這裡寄送驗證信
        try {
            const data = await registerApi.register(email);
            if (data.status === 'verified') {
                setIsSending(true);
                setShowVerification(true);
                setCountdown(45);
        
                const intervalId = setInterval(() => {
                    setCountdown((prevCountdown) => prevCountdown - 1);
                }, 1000);
        
                setTimeout(() => {
                    setIsSending(false);
                    clearInterval(intervalId);
                }, 45000);
                alert(`${data.message}`);
                return true;
            } else {
                alert(`${data.message}`);
                return false;
            }
        } catch (error) {
            console.error('Error getting user info:', error);
            alert(`'錯誤訊息，請重新驗證'`);
        }
    };

    useEffect(() => {
        if (countdown === 0) {
            setCountdown(45);
        }
    }, [countdown]);


    const handleVerificationCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const checkVerificationInDatabase = async () => {
        // 在這裡檢查驗證碼是否正確
        // true => ok
        // false => 錯誤
        try{
            const data = await registerApi.verifyEmailPost(email, verificationCode);
            console.log(data);
            if(data.status === 'verified'){
                console.log(data);
                setVerificationPass(true);
                setVeriHint('');
                alert(`${data.message}`);
                return true;
            }else{
                setVerificationPass(false);
                setVeriHint('驗證碼錯誤');
                alert(`${data.message}`);
                return false;
            }
        }catch(error){
            console.error('Error getting user info:', error);
            alert(`'錯誤訊息，請重新驗證'`);
        }
    }

    useEffect(() => {
        console.log('verificationPass changed:', verificationPass);
    }, [verificationPass]);

    const checkVerification = async () => {
        // 檢查驗證碼是否正確
        await checkVerificationInDatabase(verificationCode);
    }


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
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
        CheckpassWordRule();
        CheckpassWordSame();
    }, [passWord, passWord_confirm]);

    const handlePasswordConfirmChange = (e) => {
        setPassword_confirm(e.target.value);
    }


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
    }, [username]);


    const checkUserNameInDatabase = async () => {
        // true => ok
        // false => 已被註冊
        try {
            const email = localStorage.getItem('email');
            const data = await registerApi.verifyUsername(username, email);
            console.log(data);

            if (data.status === 'success') {
                setUsernameRegistered(false);
                return false;
            } else {
                setUsernameRegistered(true);
                return true;
            }        
        } catch(error) {
            if (error.response) {
                console.log(error.response.data);
                // error.response.data 將會是你的錯誤訊息物件，例如：
                // { status: "failed", message: "使用者名稱已有人使用，請更換其他名稱" }
                if (error.response.data.status === 'failed') {
                    setUsernameRegistered(true);
                } else {
                    setUsernameRegistered(false);
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
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('表單已提交:', { email, passWord, passWord_confirm, username });
        try{
            const data = await registerApi.verifyMemberPatch(email, passWord, username, userSchoolName);
            if(data.status === 'success'){
                console.log(data);
                alert(`${data.message}`);
                // 跳轉到登入頁面
                window.location.href = '/login';
            }else{
                alert(`${data.message}`);
            }
        }catch(error){
            console.error('Error getting user info:', error);
            alert(`'錯誤訊息，請重新嘗試註冊'`);
        }
    };

    return (
        <div className={registerStyles.registerContainer}>
            <form className={registerStyles.registerForm} onSubmit={handleSubmit}>
                <EmailRegisterInput
                isFocused={isFocused}
                email={email}
                handleEmailChange={handleEmailChange}
                emailRegistered={emailRegistered}
                SentMail={SentMail}
                isSending={isSending}
                countdown={countdown}

                verificationPass={verificationPass}
                showVerification={showVerification}
                verificationCode={verificationCode}
                handleVerificationCodeChange={handleVerificationCodeChange}
                veriHint={veriHint}
                checkVerification={checkVerification}

                handleInputFocus={handleInputFocus}
                handleInputBlur={handleInputBlur}
                />
                
                <NormalRegisterInput
                hint="輸入密碼"
                name="password-input"
                type="password"
                value={passWord}
                onChange={handlePasswordChange}
                placeholder="請輸入密碼"
                isFocused={isFocused}
                errorHint="密碼至少要8個字"
                isErrorCondition={!passWordRuleMatched}
                />

                <NormalRegisterInput
                hint="確認密碼"
                name="password-confirm-input"
                type="password"
                value={passWord_confirm}
                onChange={handlePasswordConfirmChange}
                placeholder="再次輸入密碼"
                isFocused={isFocused}
                errorHint="密碼不同"
                isErrorCondition={!isPassWordSame}
                />

                <NormalRegisterInput
                hint="使用者名稱"
                name="username-input"
                type="text"
                value={username}
                onChange={handleUserNameChange}
                placeholder="請輸入使用者名稱"
                isFocused={isFocused}
                errorHint="該名稱已被使用"
                isErrorCondition={usernameRegistered}
                />


                <NormalRegisterInput
                hint="交換學校"
                name="school-input"
                type="text"
                value={userSchoolName}
                onChange={handleUserSchoolNameChange}
                placeholder="請輸入交換學校"
                isFocused={isFocused}
                errorHint="交換學校不可為空"
                isErrorCondition={false}
                />

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
                <div className={registerStyles.submitContainer}>
                    <button type="submit" disabled={!isPassWordSame || !verificationPass || usernameRegistered || !email || !passWord || !username || !userSchoolName} className={registerStyles.loginForm__button}>
                        {(!isPassWordSame || !verificationPass || usernameRegistered || !email || !passWord || !username || !userSchoolName) ? '請檢查表單' : '送出表單'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;