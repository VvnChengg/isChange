import React, { Fragment, useState, useEffect } from 'react';
import { registerApi } from '../../api/registerApi';
import { editApi } from '../../api/editApi';
import editStyles from '../../styles/Edit.module.css';
import Button from '../../components/Button';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

// 編輯基本資料的元件
export const StudentVeri = ({ showStudentVeri, handleClose, isFocused, handleInputFocus, handleInputBlur}) => {
    const intl = useIntl();
    const [schoolEmail, setSchoolEmail] = useState('');
    const [schoolEmailRegistered, setSchoolEmailRegistered] = useState(null);
    const [veriCode, setVeriCode] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [countdown, setCountdown] = useState(45);
    const [showVerification, setShowVerification] = useState(false);



    const handleSchoolEmailChange = (e) => { 
        setSchoolEmail(e.target.value);
    }

    const handleVeriCodeChange = (e) => {
        setVeriCode(e.target.value);
    }

    const checkAndSendSchoolEmail = async () => {
        // 檢查此email是否已被註冊
        // let registered = await checkEmailInDatabase(schoolEmail);
        let registered = false;
        setSchoolEmailRegistered(registered);

        //若已被註冊則不寄送，並彈出視窗
        if (registered) {
            alert(`${intl.formatMessage({ id: 'edit.schoolEmailRegistered' })}`);
        } else if(registered === false){
            sendMail(schoolEmail);
            // console.log('寄送驗證信:', email);
        }

    }
    
    const sendMail = async (schoolEmail) => {
        // 在這裡寄送驗證信
        try {
            // const data = await editApi.sendSchoolEmail(schoolEmail);
            const data = [];
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
            // console.error('Error getting user info:', error);
            alert(`${intl.formatMessage({ id: 'edit.resendMail' })}`);
            // alert(`'錯誤訊息，請重新驗證'`);
        }
    }

    
    useEffect(() => {
        if (countdown === 0) {
            setCountdown(45);
        }
    }, [countdown]);

    const handleConfirmVeriCode = async () => {

    }



    return (
        <Fragment>
            {showStudentVeri && (
                <div className={editStyles.floatingDiv}>
                    <button onClick={handleClose} className={editStyles.closeButton}>X</button>
                    <form className={editStyles.registerForm}>
                        <label htmlFor='schoolEmail' className={editStyles.loginForm__label}>
                            <FormattedMessage id='edit.schoolEmail' />
                        </label>
                        <div className={editStyles.editForm__inputGroup}>
                            <div className={`${editStyles.editForm__InputContainer} ${isFocused ? 'focused' : ''}`}>
                                <FormattedMessage id='edit.pleaseEnterSchoolEmail'>
                                    {(text) =><input
                                        type='text'
                                        id='schoolEmail'
                                        value={schoolEmail}
                                        onChange={handleSchoolEmailChange}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                        className={editStyles.editForm__input}
                                        placeholder={text}
                                        required
                                    />}
                                </FormattedMessage>
                            </div>
                            <Button
                                style={ {whiteSpace:'nowrap'} }
                                onClick={checkAndSendSchoolEmail}
                                text={<FormattedMessage id='edit.sendVerification' />}
                            />
                        </div>

                        <label htmlFor='vericode' className={editStyles.loginForm__label}>
                            <FormattedMessage id='edit.veriCode' />
                        </label>
                        <div className={editStyles.editForm__inputGroup}>
                            <div className={`${editStyles.editForm__InputContainer} ${isFocused ? 'focused' : ''}`}>
                                <FormattedMessage id='edit.pleaseEnterVeriCode'>
                                    {(text) => <input
                                    type='text'
                                    id='vericode'
                                    value={veriCode}
                                    onChange={handleVeriCodeChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    className={editStyles.editForm__input}
                                    placeholder={text}
                                    required/>}
                                </FormattedMessage>
                            </div>
                            <Button
                                style={ {whiteSpace:'nowrap'} }
                                onClick={handleConfirmVeriCode}
                                text={<FormattedMessage id='edit.confirmCode' />}
                            />
                        </div>
                    </form>
                </div>
            )}
        </Fragment>
    );
}