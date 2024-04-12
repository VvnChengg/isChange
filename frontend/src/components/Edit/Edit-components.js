import React, { Fragment } from 'react';

export const PassWordEdit = ({ setShowPasswordDiv, showPasswordDiv, 
    handleClose, isFocused, OriginPassWord, handleOriginPassWordChange,
    passWord, handlePasswordChange, handleInputFocus, 
    handleInputBlur, passWordRuleMatched,
    passWord_confirm, handlePasswordConfirmChange, isPassWordSame,
    handleSubmitPassWord }) => (
    <Fragment>
            <div className="section-1-right">
                <div className="section-heading">基本資料修改</div>
                <div className="action-buttons">
                    <button onClick={() => setShowPasswordDiv(true)}>修改密碼</button>
                    <button>修改名稱學校</button>
                </div>
            </div>

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