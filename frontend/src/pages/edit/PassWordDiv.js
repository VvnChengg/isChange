import React, { Fragment, useState, useEffect } from 'react';
import { BASE_URL } from '../../constants';

export const PassWordEdit = ({ showPasswordDiv,
    handleClose, isFocused, handleInputBlur, handleInputFocus }) => {
    const [OriginPassWord, setOriginPassWord] = useState(''); // 之後要補原密碼的判斷
    const [isOriginPassWordCorrect, setIsOriginPassWordCorrect] = useState(true); // 之後要補原密碼的判斷

    //不知道有沒有要用的一塊 先放著
    // const [email, setEmail] = useState('');
    // const [emailRegistered, setEmailRegistered] = useState(false);
    // const [countdown, setCountdown] = useState(45);
    // const [verificationCode, setVerificationCode] = useState(''); // 驗證碼
    // const [verificationPass, setVerificationPass] = useState(false); // 驗證碼是否通過
    // const [shouldCheckVeri, setShouldCheckVeri] = useState(false); // 是否應該檢查驗證碼
    // const [veriHint, setVeriHint] = useState(''); // 驗證碼錯誤提示
    // const [isSending, setIsSending] = useState(false); // 是否正在發送驗證碼

    const [passWord, setPassword] = useState('');
    const [passWord_confirm, setPassword_confirm] = useState('');
    const [isPassWordSame, setIsPassWordSame] = useState(true); // 密碼是否相同
    const [passWordRuleMatched, setPassWordRuleMatched] = useState(true);


    // // email群 不確定有沒有要用
    // // 檢查email是否已被註冊
    // const checkEmailInDatabase = (email) => {
    //     // 在這裡從資料庫檢查email是否已被註冊
    //     // true => ok
    //     // false => 已被註冊
    //     return false; // 模拟未被注册的情况
    // };

    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value);
    // };


    // const SentMail = () => {
    //     // 檢查此email是否已被註冊
    //     let registered = checkEmailInDatabase(email);
    //     setEmailRegistered(registered);

    //     //若已被註冊則不寄送，並彈出視窗
    //     if (emailRegistered) {
    //         alert('此信箱已被註冊');
    //     } else {
    //         sendMail(email);
    //         // console.log('寄送驗證信:', email);
    //     }
    // };

    // const sendMail = (email) => {
    //     // 在這裡寄送驗證信

    //     setIsSending(true);
    //     setCountdown(45);

    //     const intervalId = setInterval(() => {
    //         setCountdown((prevCountdown) => prevCountdown - 1);
    //     }, 1000);

    //     setTimeout(() => {
    //         setIsSending(false);
    //         clearInterval(intervalId);
    //     }, 45000);
    // };

    // useEffect(() => {
    //     if (countdown === 0) {
    //         setCountdown(45);
    //     }
    // }, [countdown]);

    // const handleVerificationCodeChange = (e) => {
    //     setVerificationCode(e.target.value);
    // };

    // const checkVerificationInDatabase = () => {
    //     // 在這裡檢查驗證碼是否正確
    //     // true => ok
    //     // false => 錯誤
    //     return true; // 模拟驗證碼正確的情况
    // }

    // const checkVerification = async () => {
    //     // 檢查驗證碼是否正確
    //     let pass = await checkVerificationInDatabase(verificationCode);
    //     setVerificationPass(pass);
    //     setShouldCheckVeri(true);
    // }

    // useEffect(() => {
    //     if (shouldCheckVeri) {
    //         if (!verificationPass) {
    //             setVeriHint('驗證碼錯誤');
    //         }
    //     }
    // }, [verificationPass, shouldCheckVeri]);

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

    const handleOriginPassWordChange = (e) => {
        setOriginPassWord(e.target.value);
    }

    const CheckOriginPassWord = () => {
        return true;
    }


    const handleSubmitPassWord = async (e) => {
        e.preventDefault();
        if (!CheckOriginPassWord() || !isPassWordSame || !passWordRuleMatched) {
            setIsOriginPassWordCorrect(false);
            alert("原始密碼不正確")
            return;
        }
        
    }

    return (
        <Fragment>
            {showPasswordDiv && (
                <div className='floating-div'>
                    <button onClick={handleClose} className="close-button">X</button>
                    <form className="register-form" onSubmit={handleSubmitPassWord}>
                        <label htmlFor="password-origin-input" className="login-form__label">輸入原密碼</label>
                        <div className="login-form__input-group">
                            <div className={`input-container ${isFocused ? 'focused' : ''}`}>
                                <input
                                    type="password"
                                    id="password-origin-input"
                                    value={OriginPassWord}
                                    onChange={handleOriginPassWordChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    className="login-form__input"
                                    placeholder="請輸入原密碼"
                                    required
                                />
                                {/* {!passWordRuleMatched && <span className="registered-text">密碼須符合...條件</span>} */}
                            </div>
                        </div>

                        <label htmlFor="password-input" className="login-form__label">輸入新密碼</label>
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
                        <label htmlFor="password-confirm-input" className="login-form__label">確認新密碼</label>
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
                        <button type="submit" className="login-form__button">
                            確認
                        </button>
                    </form>
                </div>
            )}
        </Fragment>
    );
}