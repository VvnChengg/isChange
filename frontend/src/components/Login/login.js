import React, { useState } from 'react';
import '../styles/LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUseEmailAuth = () => {
    // 實現使用電子信箱登入的邏輯
    console.log('使用電子信箱登入:', email);
  };

  const handleUseGoogleAuth = () => {
    // 實現使用Google登入的邏輯
    console.log('使用Google登入');
  };

  return (
    <div className="login-form">
      <h2 className="login-form__title">登入或建立帳號</h2>
      <div className="login-form__input-group">
        <label htmlFor="email" className="login-form__label">
          電子信箱
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="login-form__input"
        />
      </div>
      <button onClick={handleUseEmailAuth} className="login-form__button">
        使用電子信箱登入
      </button>
      <button onClick={handleUseGoogleAuth} className="login-form__button">
        使用 Google 帳號登入
      </button>
    </div>
  );
};

export default LoginForm;