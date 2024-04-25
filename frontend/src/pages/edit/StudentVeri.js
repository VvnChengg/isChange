import React, { Fragment, useState, useEffect } from 'react';
import { registerApi } from '../../api/registerApi';
import { editApi } from '../../api/editApi';
import editStyles from '../../styles/Edit.module.css';
import Button from '../../components/Button';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { useToken } from '../../hooks/useToken';


// 編輯基本資料的元件
export const StudentVeri = ({ showStudentVeri, setStudentVeriStatus, handleClose, isFocused, handleInputFocus, handleInputBlur}) => {
    const intl = useIntl();
    const [schoolEmail, setSchoolEmail] = useState('');
    const [schoolEmailRegistered, setSchoolEmailRegistered] = useState(null);
    const [veriCode, setVeriCode] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [countdown, setCountdown] = useState(45);
    const [showVerification, setShowVerification] = useState(false);
    const token = useToken();



    const handleSchoolEmailChange = (e) => { 
        setSchoolEmail(e.target.value);
    }

    const handleVeriCodeChange = (e) => {
        setVeriCode(e.target.value);
    }
    
    // 在這裡寄送驗證信
    const checkAndSendSchoolEmail = async () => {
        if (!schoolEmail.split('@').pop().includes('edu')){
            alert(`${intl.formatMessage({ id: 'edit.notStudentEmail' })}`);
            return;
        }

        try {
            const data = await editApi.editStudentVeriSendCode(schoolEmail, token);
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

                alert(`${intl.formatMessage({ id: 'edit.sentVerification' })}`);
                return true;
            }
        } catch (error) {
            if (error.response.data.error === 'Email已被使用') {
                alert(`${intl.formatMessage({ id: 'edit.schoolEmailRegistered' })}`);
            }else{
                alert(`${intl.formatMessage({ id: 'edit.resendMail' })}`);
            }
        }
    }

    
    useEffect(() => {
        if (countdown === 0) {
            setCountdown(45);
        }
    }, [countdown]);

    // 確認驗證碼
    const handleConfirmVeriCode = async () => {
        try{
            const data = await editApi.editStudentVeri(schoolEmail, veriCode, token);
            if(data.status === 'success'){
                alert(`${intl.formatMessage({ id: 'edit.studentVeriSuccess' })}`);
                handleClose();
                setStudentVeriStatus(true);
                window.location.reload();
            }

        } catch (error) {
            alert(`${intl.formatMessage({ id: 'edit.reVeriCode' })}`);
        }
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
                                style={ { 
                                backgroundColor: (!schoolEmail || isSending) ? '#ccc' : '',
                                color: (!schoolEmail || isSending) ? '#888' : '',
                                cursor: (!schoolEmail || isSending) ? 'not-allowed' : 'default',
                                height: 'auto'
                            } }
                                onClick={(!schoolEmail || isSending)?  undefined : checkAndSendSchoolEmail}
                                text={isSending? <FormattedMessage id='edit.sendingVeri' values={{ countdown: countdown }} /> : <FormattedMessage id='edit.sendVerification' />}
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