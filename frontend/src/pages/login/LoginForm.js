import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

import loginStyles from '../../styles/LoginForm.module.css';

import LoginFormPwd from './LoginFormPwd'; // 匯入密碼表單元件
import EmailInput from './EmailInput';
import Button from '../../components/Button';

import { loginApi } from '../../api/loginApi';

const LoginForm = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false); // 狀態用於顯示/隱藏密碼表單

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  // 模擬從資料庫中獲取使用者資訊的函數
  const getUserInfoFromDatabase = async (email) => {
    try {
      const data = await loginApi.login_or_register(email);
      // console.log(data);
      if (data && data.error) {
        // Handle error in data
        // console.error('Error in data:', data.error);
      } else {
        setShowPasswordForm(true);
      }
      return data;
    } catch (error) {
      // Handle error
      if (error.response && error.response.data.status === 'None') {
        // 如果使用者資訊不存在，執行其他登入邏輯（例如發送驗證郵件等）
        // 實現使用電子郵件登入的邏輯
        // console.log('電子信箱建立新帳號:', email);
        navigate('/register');

      } else {
        // console.error('Error getting user info:', error);
      }
      
      // navigate('/register'); //因為現在可以判斷成功登入，但找不到使用者會噴錯，有點偷吃步但之後應該要改掉
    }
  }

  const handleUseEmailAuth = async () => {
    await getUserInfoFromDatabase(email); // 假設這個函數是用來從資料庫中獲取使用者資訊的
  };

  const handleUseGoogleAuth = () => {
    // 實現使用 Google 登入的邏輯
    console.log('使用 Google 登入');
  };

  return (
    <>
      {!showPasswordForm && (
        <>
          <div className={`${loginStyles.loginForm} ${showPasswordForm ? 'hidden' : ''}`}>
            <h2 className= {loginStyles.loginForm__title}>
              <FormattedMessage id='login.title' />
            </h2>
            <EmailInput email={email} handleEmailChange={handleEmailChange} />

            <Button
              style={{ width: '60%', height: '35px', margin: 'auto' }}
              onClick={handleUseEmailAuth}
              text={intl.formatMessage({ id: 'login.useEmailLogin' })}
            />

            <label className={loginStyles.loginForm__label}>
              <FormattedMessage id='login.or' />
            </label>
            
            <Button
              style={{ width: '60%', height: '35px', margin: 'auto' }}
              secondary={true}
              onClick={handleUseGoogleAuth}
              text={intl.formatMessage({ id: 'login.useGoogleLogin' })}
            />
          </div>
        </>
      )}
      {showPasswordForm && <LoginFormPwd email={email} />} {/* 根據狀態來決定是否渲染密碼表單 */}
    </>
  );
};

export default LoginForm;
