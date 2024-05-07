import { Fragment } from 'react';
import registerStyles from '../../styles/Register.module.css';
import { useIntl } from 'react-intl';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export const NormalRegisterInput = ({ hint, name, type, value, placeholder, isFocused, isErrorCondition ,errorHint, onChange, isButtonPresent}) => {
    return (
        <Fragment>
            <label htmlFor= {name} className={registerStyles.loginForm__label}>{hint}</label>
            <div className={registerStyles.loginForm__inputGroup}>
                <div className={`${registerStyles.inputContainer} ${isFocused ? 'focused' : ''}`}>
                    <input
                        type={type}
                        id={name}
                        value={value}
                        onChange={onChange}
                        className={registerStyles.loginForm__input}
                        placeholder={placeholder}
                        required
                    />
                {isErrorCondition && <span className={registerStyles.registeredText}>{errorHint}</span>}
                </div>
                {isButtonPresent && isButtonPresent}
            </div>
        </Fragment>
    );
}

export const EmailRegisterInput = ({ isFocused, email, handleEmailChange, handleInputFocus, handleInputBlur,
    emailRegistered, checkAndSendMail, isSending, countdown, verificationPass,
    showVerification, verificationCode, handleVerificationCodeChange, veriHint, checkVerification,
    isEmailSentLoading, isVeriCodeSentLoading }) => {
    const intl = useIntl();
        return (
        <Fragment>
            <NormalRegisterInput
                hint = {intl.formatMessage({ id: 'register.email' })}
                name = 'email'
                type = 'email'
                value = {email}
                placeholder = {intl.formatMessage({ id: 'register.pleaseInputEmail' })}
                isFocused = {isFocused}
                isErrorCondition = {emailRegistered}
                errorHint = {intl.formatMessage({ id: 'register.emailRegisteredHint' })}
                onChange = {handleEmailChange}
                isButtonPresent = {
                    <button
                        type='button'
                        onClick={checkAndSendMail}
                        className={`${registerStyles.loginForm__button} ${registerStyles.sendButton} ${isSending ? registerStyles.disabled : ''}`}
                        disabled={isSending || verificationPass || (email.split('@').pop().includes('edu') || isEmailSentLoading)}
                    >
                       {isEmailSentLoading ?
                       <div>
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} />
                            {intl.formatMessage({ id: 'loading' })}
                       </div>
                       : isSending ? 
                        intl.formatMessage({ id: 'register.countdown' }, { countdown }) : 
                        (email.split('@').pop().includes('edu')) ? 
                            intl.formatMessage({ id: 'register.noStudentAccount' }) : 
                            intl.formatMessage({ id: 'register.sendVerification' })
                        }
                    </button>
                }
            />
            
            {showVerification && (
                <NormalRegisterInput
                    hint = {intl.formatMessage({ id: 'register.verificationCode' })}
                    name = 'verificationCode'
                    type = 'text'
                    value = {verificationCode}
                    placeholder = {intl.formatMessage({ id: 'register.pleaseInputVerificationCode' })}
                    isFocused = {isFocused}
                    isErrorCondition = {!verificationPass}
                    errorHint = {veriHint}
                    onChange = {handleVerificationCodeChange}
                    isButtonPresent = {
                        <button type='button' onClick={checkVerification} className={`${registerStyles.loginForm__button} ${registerStyles.sendButton} ${verificationPass ?  registerStyles.disabled: ''}`}
                            disabled={verificationPass || isVeriCodeSentLoading}>
                            {isVeriCodeSentLoading ?
                            <div>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} />
                                {intl.formatMessage({ id: 'loading' })}
                            </div>
                            : verificationPass ?
                                intl.formatMessage({ id: 'register.verifiedCondition' }) :
                                intl.formatMessage({ id: 'register.unverifiedCondition' })
                            }
                        </button>
                    }
                />
            )}
        </Fragment>
    );
}