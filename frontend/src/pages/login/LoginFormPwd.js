import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 匯入 useHistory 鉤子
import { loginApi } from '../../api/loginApi';
import loginStyles from '../../styles/LoginForm.module.css';
import { FormattedMessage } from 'react-intl';
import Button from "../../components/Button";
import { useIntl } from 'react-intl';



const LoginFormPwd = ({ email }) => { // 從 props 中獲取 email
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const intl = useIntl();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async () => {
    try {
      // 調用 loginApi 中的 login 函數，傳入 email 和 password
      const data = await loginApi.login(email, password);
      if (data.status === "success") {
        navigate('/');
      }
    } catch (error) {
      // console.error(error);
      alert(`${error.response.data.message}`);
    }
  };
  return (
    <div className={loginStyles.loginForm}>
      <h2 className={loginStyles.loginForm__title}><FormattedMessage id='login.enterPassword' /></h2>
      <div className={loginStyles.loginForm__inputGroup}>
        <label className={loginStyles.loginForm__label}>
          <FormattedMessage id='login.password' />
        </label>

        <FormattedMessage id='login.inputPassword'>
          {msg =>
            <input
              type="password" // 設置為密碼輸入框
              id="password"
              value={password} // 設置為你的密碼 state 變數
              onChange={handlePasswordChange} // 設置密碼變化的事件處理函數
              className={loginStyles.loginForm__input} // 設置樣式類名
              placeholder={msg} // 設置密碼輸入框的占位符
            />
          }
        </FormattedMessage>

      </div>
      <Button
        style={{ width: '100%' }}
        onClick={handleFormSubmit}
        text={intl.formatMessage({ id: 'login.login' })}
      />

    </div>
  );
};

export default LoginFormPwd;
