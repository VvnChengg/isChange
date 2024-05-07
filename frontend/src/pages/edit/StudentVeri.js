import React, { Fragment, useState, useEffect } from 'react';
import { registerApi } from '../../api/registerApi';
import { editApi } from '../../api/editApi';
import editStyles from '../../styles/Edit.module.css';
import Button from '../../components/Button';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { useToken } from '../../hooks/useToken';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isVeriCodeSubmitting, setIsVeriCodeSubmitting] = useState(false);



    const handleSchoolEmailChange = (e) => { 
        setSchoolEmail(e.target.value);
    }

    const handleVeriCodeChange = (e) => {
        setVeriCode(e.target.value);
    }
    
    // 在這裡寄送驗證信
    const checkAndSendSchoolEmail = async () => {
        setIsSubmitting(true);
        if (!schoolEmail.split('@').pop().includes('edu')){
            toast.error(`${intl.formatMessage({ id: 'edit.notStudentEmail' })}`);
            setIsSubmitting(false);
            return;
        }

        try {
            const data = await editApi.editStudentVeriSendCode(schoolEmail, token);
            setIsSubmitting(false);
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

                toast.info(`${intl.formatMessage({ id: 'edit.sentVerification' })}`);
                return true;
            }
        } catch (error) {
            if (error.response.data.error === 'Email已被使用') {
                toast.error(`${intl.formatMessage({ id: 'edit.schoolEmailRegistered' })}`);
            }else{
                toast.error(`${intl.formatMessage({ id: 'edit.resendMail' })}`);
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
        setIsVeriCodeSubmitting(true);
        try{
            const data = await editApi.editStudentVeri(schoolEmail, veriCode, token);
            console.log(data);
            if(data.status === 'success'){
                toast.success(`${intl.formatMessage({ id: 'edit.studentVeriSuccess' })}`);
                handleClose();
                window.location.reload();
            }
            setIsVeriCodeSubmitting(false);
        } catch (error) {
            console.log(error);
            toast.error(`${intl.formatMessage({ id: 'edit.reVeriCode' })}`);
            setIsVeriCodeSubmitting(false);
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
                                backgroundColor: (!schoolEmail || isSending || isSubmitting) ? '#ccc' : '',
                                color: (!schoolEmail || isSending || isSubmitting) ? '#888' : '',
                                cursor: (!schoolEmail || isSending || isSubmitting) ? 'not-allowed' : '',
                                height: 'auto'
                            } }
                                onClick={(!schoolEmail || isSending)?  undefined : checkAndSendSchoolEmail}
                                text={isSubmitting?
                                <div>
                                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} />
                                    {intl.formatMessage({ id: 'loading' })}
                                </div>    
                                : isSending? <FormattedMessage id='edit.sendingVeri' values={{ countdown: countdown }} /> 
                                : <FormattedMessage id='edit.sendVerification' />}
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
                                style={ {
                                    whiteSpace:'nowrap',
                                    backgroundColor: (!veriCode || isVeriCodeSubmitting) ? '#ccc' : '',
                                    color: (!veriCode || isVeriCodeSubmitting) ? '#888' : '',
                                    cursor: (!veriCode || isVeriCodeSubmitting) ? 'not-allowed' : '',
                                    height: 'auto'
                            } }
                                onClick={handleConfirmVeriCode}
                                text={isVeriCodeSubmitting?
                                    <div>
                                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} />
                                        {intl.formatMessage({ id: 'loading' })}
                                    </div>    
                                    :<FormattedMessage id='edit.confirmCode' />}
                            />
                        </div>
                    </form>
                </div>
            )}
        </Fragment>
    );
}