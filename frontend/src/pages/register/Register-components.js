import React from 'react';

//想組件化但還沒修好 之後再修

export const InputWithButton = ({ id, type, value, handleInputChange, handleInputFocus, handleInputBlur, isFocused, registeredText, isButtonDisabled, countdown, buttonText, handleButtonClick }) => (
    <div>
        <label htmlFor={id} className="login-form__label">{id}</label>
        <div className="login-form__input-group">
            <div className={`input-container ${isFocused ? 'focused' : ''}`}>
                <input
                    type={id === 'email' ? 'email' : 'text'}
                    id={id}
                    value={value}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className="login-form__input"
                    placeholder={`請輸入${id}`}
                    required
                />
                {registeredText && <span className="registered-text">{registeredText}</span>}
            </div>
            <button
                onClick={handleButtonClick}
                className={`login-form__button send-button ${isButtonDisabled ? 'disabled' : ''}`}
                disabled={isButtonDisabled}
            >
                {isButtonDisabled ? `再 ${countdown} 秒可以重新寄送` : buttonText}
            </button>
        </div>
    </div>
);