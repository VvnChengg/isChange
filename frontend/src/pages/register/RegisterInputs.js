import { Fragment } from "react";

export const NormalRegisterInput = ({ hint, name, type, value, placeholder, isFocused, isErrorCondition ,errorHint, onChange, isButtonPresent}) => {
    return (
        <Fragment>
            <label htmlFor= {name} className="login-form__label">{hint}</label>
            <div className="login-form__input-group">
                <div className={`input-container ${isFocused ? 'focused' : ''}`}>
                    <input
                        type={type}
                        id={name}
                        value={value}
                        onChange={onChange}
                        className="login-form__input"
                        placeholder={placeholder}
                        required
                    />
                {isErrorCondition && <span className="registered-text">{errorHint}</span>}
                </div>
                {isButtonPresent && isButtonPresent}
            </div>
        </Fragment>
    );
}

export const EmailRegisterInput = ({ isFocused, email, handleEmailChange, handleInputFocus, handleInputBlur,
    emailRegistered, SentMail, isSending, countdown, verificationPass,
    showVerification, verificationCode, handleVerificationCodeChange, veriHint, checkVerification }) => {
    return (
        <Fragment>
            <NormalRegisterInput
                hint = "電子信箱"
                name = "email"
                type = "email"
                value = {email}
                placeholder = "請輸入電子信箱"
                isFocused = {isFocused}
                isErrorCondition = {emailRegistered}
                errorHint = "已被註冊"
                onChange = {handleEmailChange}
                isButtonPresent = {
                    <button
                        type="button"
                        onClick={SentMail}
                        className={`login-form__button send-button ${isSending ? 'disabled' : ''}`}
                        disabled={isSending || verificationPass || (email.split('@').pop().includes('edu'))}
                    >
                        {isSending ? `再 ${countdown} 秒可以重新寄送` : (email.split('@').pop().includes('edu')) ? '註冊時無法使用學生帳號' : '寄送驗證信'}
                    </button>
                }
            />
            
            {showVerification && (
                <NormalRegisterInput
                    hint = "驗證碼"
                    name = "verificationCode"
                    type = "text"
                    value = {verificationCode}
                    placeholder = "請輸入驗證碼"
                    isFocused = {isFocused}
                    isErrorCondition = {!verificationPass}
                    errorHint = {veriHint}
                    onChange = {handleVerificationCodeChange}
                    isButtonPresent = {
                        <button type="button" onClick={checkVerification} className={`login-form__button send-button ${verificationPass ? 'disabled' : ''}`}
                            disabled={verificationPass}>
                            {verificationPass ? `已驗證` : '驗證'}
                        </button>
                    }
                />
            )}
        </Fragment>
    );
}