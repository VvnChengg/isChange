import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

import loginStyles from '../../styles/LoginForm.module.css';

import LoginFormPwd from './LoginFormPwd'; // 匯入密碼表單元件
import EmailInput from './EmailInput';
import Button from '../../components/Button';

import { loginApi } from '../../api/loginApi';

import { GoogleLogin } from '@react-oauth/google';

import { toast } from 'react-toastify';

const LoginForm = () => {
  const oauth_cliend_id = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
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

      if (data && data.error) {
        toast.error(intl.formatMessage({ id: 'login.error' }));
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

      }
      
    }
  }

  const handleUseEmailAuth = async () => {
    await getUserInfoFromDatabase(email); // 假設這個函數是用來從資料庫中獲取使用者資訊的
  };


  const responseGoogle = async (response) => {
    // console.log(response);
    const tokenId = response.credential;

    if(tokenId){
      try{
        const data = await loginApi.sso_login(tokenId);
        // console.log(data);
        if(data.status === 'success'){
          navigate('/');
        }
      }catch(error){
        // console.log(error);
        if(error.response.data.error === '此帳號已註冊，請使用原本的帳號登入'){
          toast.error(intl.formatMessage({ id: 'login.errorGoogleAccount' }));
        }else{
          toast.error(intl.formatMessage({ id: 'login.error' }));
        }
    }
  }
}


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
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <GoogleLogin
                    clientId={oauth_cliend_id}
                    buttonText={intl.formatMessage({ id: 'login.useGoogleLogin' })}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
            </div>

          </div>
        </>
      )}
      {showPasswordForm && <LoginFormPwd email={email} />}
    </>
  );
};

export default LoginForm;
