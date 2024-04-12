import React, { useState } from 'react';
import '../../styles/LoginForm.css';
import { loginApi } from '../../api/loginApi';

const LoginFormPwd = ({ email }) => { // 從 props 中獲取 email
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async () => {
    try {
      // 調用 loginApi 中的 login 函數，傳入 email 和 password
      await loginApi.login(email, password);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="login-form">
      <h2 className="login-form__title">請輸入密碼</h2>
      <div className="login-form__input-group">
        <label className="login-form__label">
          密碼
        </label>
        <input
          type="password" // 設置為密碼輸入框
          id="password"
          value={password} // 設置為你的密碼 state 變數
          onChange={handlePasswordChange} // 設置密碼變化的事件處理函數
          className="login-form__input" // 設置樣式類名
          placeholder="請輸入密碼" // 設置密碼輸入框的占位符
        />
      </div>
      <button onClick={handleFormSubmit} className="login-form__button">
        確認
      </button>
    </div>
  );
};

export default LoginFormPwd;
