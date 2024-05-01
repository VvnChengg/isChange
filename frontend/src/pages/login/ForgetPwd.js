import React, { useState, useEffect, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

import loginStyles from '../../styles/LoginForm.module.css';

import Button from '../../components/Button';
import { Input, Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { loginApi } from '../../api/loginApi';
import { registerApi } from '../../api/registerApi';

export const ForgetPwd = ({ isModalOpen ,setIsModalOpen }) => { // 從 props 中獲取 email
    const intl = useIntl();
    const [email, setEmail] = useState('');
    const [vericode, setVericode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isVeriLoading, setIsVeriLoading] = useState(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [countdown, setCountdown] = useState(45);
    const [showVerification, setShowVerification] = useState(false);
    const [verificationPass, setVerificationPass] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPassWordSame, setIsPassWordSame] = useState(false);
    const [passWordRuleMatched, setPassWordRuleMatched] = useState(false);
    


    const handleOk = () => {
        setIsModalOpen(false);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleVericodeChange = (e) => {
        setVericode(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const CheckPasswordsMatch = () => {
        setIsPassWordSame(password === confirmPassword);
    }

    const CheckpassWordRule = () => {
        // 之後要補密碼規則
        // 密碼長度至少為 8
        if (password.length < 8) {
            setPassWordRuleMatched(false);
            return;
        }
        setPassWordRuleMatched(true);
    }


    useEffect(() => {
        if (countdown === 0) {
            setCountdown(45);
        }}, [countdown]);

    useEffect(() => {
        CheckpassWordRule();
        CheckPasswordsMatch();
    }, [confirmPassword, password]);


    const handleSendMail = async () => {
        setIsLoading(true);
        // const response = await fetchData();
        try{
            const data = await registerApi.register(email);
            setIsLoading(false);
            if(data.status === 'verified'){
                alert(`${intl.formatMessage({ id: 'login.mailSent' })}`)
                setIsSending(true);
                setCountdown(45);
        
                const intervalId = setInterval(() => {
                    setCountdown((prevCountdown) => prevCountdown - 1);
                }, 1000);
        
                setTimeout(() => {
                    setIsSending(false);
                    clearInterval(intervalId);
                }, 45000);

                setShowVerification(true);

            }
            } catch (error) {
                alert('error');
            }
      
    }

    const handleConfirmVeriCode = async () => {
        try{
                setIsVeriLoading(true);
                const data = await registerApi.verifyEmailPost(email, vericode);
                if(data.status === 'verified'){
                    // alert('verified');
                    setVerificationPass(true);
                    setIsVeriLoading(false);
                    alert(`${intl.formatMessage({ id: 'register.emailVerified' })}`);
                }
            } catch (error) {
                setVerificationPass(false);
                setIsVeriLoading(false);
                alert(`${intl.formatMessage({ id: 'register.emailVerifiedFailed' })}`);
            }
    }

    const handleSubmitPassWord = async () => {
        try{
            setIsSubmitLoading(true);
            const data = await loginApi.forgetPassword(email, password);
            if(data.status === 'success'){
                alert(`${intl.formatMessage({ id: 'login.passwordChanged' })}`);
                setIsModalOpen(false);
                setIsSubmitLoading(false);
            }
        } catch (error) {
            alert(`${intl.formatMessage({ id: 'login.passwordChangeFailed' })}`);
            setIsSubmitLoading(false);
        }
    }
    
    return(
        <Modal 
        // bodyStyle={{ height: '50vh' }}
        centered
        title={intl.formatMessage({ id: 'login.forgotPwd' })}
        open={isModalOpen} 
        footer={null} 
        onOk={handleOk} 
        onCancel={handleCancel}>
            <label className={loginStyles.loginForm__label}><FormattedMessage id='register.email' /></label>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input
                type='email'
                id = 'email'
                value = {email}
                onChange = {handleEmailChange}
                placeholder={intl.formatMessage({id: 'login.forgotPwdEmail'})}
                style={{ flex: 1, marginRight: '1rem' }}
            />
            <Button 
                style={ { 
                    backgroundColor: ( !email || isSending || isLoading || verificationPass) ? '#ccc' : '',
                    color: (!email || isSending || isLoading || verificationPass) ? '#888' : '',
                    cursor: (!email || isSending || isLoading || verificationPass) ? 'not-allowed' : '',
                    textAlign: 'center',
                } }

                text = {
                isLoading ? 
                    <div>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} />
                    {intl.formatMessage({ id: 'loading' })}
                    </div>
                : isSending ?
                    intl.formatMessage({ id: 'register.countdown' }, { countdown}) 
                : intl.formatMessage({ id: 'login.sendMail' })}
                onClick={isSending || verificationPass? undefined : handleSendMail}
            />
            </div>

            {showVerification &&
            <Fragment>
                <label className={loginStyles.loginForm__label}><FormattedMessage id='register.verificationCode' /></label>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <input
                    type='text'
                    className={loginStyles.loginForm__input} // 設置樣式類名
                    id = 'vericode'
                    value = {vericode}
                    onChange = {handleVericodeChange}
                    placeholder={intl.formatMessage({id: 'register.pleaseInputVerificationCode'})} // 設置密碼輸入框的占位符
                    style={{ flex: 1, marginRight: '1rem' }}
                />
                <Button 
                    style = {
                        {
                            backgroundColor: (!vericode || isVeriLoading || verificationPass) ? '#ccc' : '',
                            color: (!vericode || isVeriLoading || verificationPass) ? '#888' : '',
                            cursor: (!vericode || isVeriLoading || verificationPass) ? 'not-allowed' : '',
                            textAlign: 'center',
                        }
                    }
                    text={
                        isVeriLoading ?
                        <div>
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} />
                            {intl.formatMessage({ id: 'loading' })}
                        </div>
                        : verificationPass ?
                        intl.formatMessage({ id: 'register.verifiedCondition' })
                        : intl.formatMessage({ id: 'register.unverifiedCondition' })}
                    onClick={isVeriLoading || verificationPass? undefined : handleConfirmVeriCode}
                />

                </div>
            </Fragment>
            }
            
            {verificationPass &&
            <Fragment>
                <label className={loginStyles.loginForm__label}><FormattedMessage id='login.newPassword' /></label>
                <div>
                    <input
                        type='password'
                        className={loginStyles.loginForm__input} // 設置樣式類名
                        id = 'password'
                        value = {password}
                        onChange = {handlePasswordChange}
                        placeholder={intl.formatMessage({id: 'login.newPasswordHint'})}
                        style={{
                            borderColor: passWordRuleMatched ? '' : 'red'
                        }}
                    />
                {(!password|| !passWordRuleMatched) && 
                <div style={{marginLeft: '3%'}} className={loginStyles.loginForm__errormsg}>
                    {intl.formatMessage({ id: 'register.passwordRule' })}
                </div>
                }

                </div>
                
                <label className={loginStyles.loginForm__label}><FormattedMessage id='register.confirmPassword' /></label>
                <div>
                <input
                    type='password'
                    className={loginStyles.loginForm__input} // 設置樣式類名
                    id = 'confirmPassword'
                    value = {confirmPassword}
                    onChange = {handleConfirmPasswordChange}
                    placeholder={intl.formatMessage({id: 'register.pleaseConfirmPassword'})} 
                    style={{ flex: 1, 
                        marginRight: '1rem',
                        borderColor: isPassWordSame ? '' : 'red'
                    }}
                />

                {!isPassWordSame && 
                <div style={{marginLeft: '3%'}} className={loginStyles.loginForm__errormsg}>
                    {intl.formatMessage({ id: 'register.passwordNotMatch' })}
                </div>
                }

                </div>
                <Button 
                    style = {
                        {
                            backgroundColor: (!password || !confirmPassword || !isPassWordSame || !passWordRuleMatched || isSubmitLoading) ? '#ccc' : '',
                            color: (!password || !confirmPassword || !isPassWordSame || !passWordRuleMatched || isSubmitLoading) ? '#888' : '',
                            cursor: (!password || !confirmPassword || !isPassWordSame || !passWordRuleMatched || isSubmitLoading) ? 'not-allowed' : '',
                            marginTop: '1rem',
                            marginLeft: 'auto',
                            textAlign: 'center',
                        }
                    }
                    text={
                        isSubmitLoading ?
                        <div>
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} />
                            {intl.formatMessage({ id: 'loading' })}
                        </div>
                        : intl.formatMessage({ id: 'login.resetPwd' })
                    }

                    onClick={(!password || !confirmPassword || !isPassWordSame || !passWordRuleMatched) ? undefined : handleSubmitPassWord}
                />
            </Fragment>
            }


        </Modal>
    );
};