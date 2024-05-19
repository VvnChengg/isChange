import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 匯入 useHistory 鉤子
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { Modal } from "antd";

import { loginApi } from '../../api/loginApi';
import loginStyles from '../../styles/LoginForm.module.css';
import { ForgetPwd } from './ForgetPwd';

import Button from '../../components/Button';
import { Input } from 'antd';
import { toast } from 'react-toastify';




const LoginFormPwd = ({ email }) => { // 從 props 中獲取 email
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const intl = useIntl();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async () => {
    try {
      // 調用 loginApi 中的 login 函數，傳入 email 和 password
      const data = await loginApi.login(email, password);
      if (data.status === 'success') {
        toast.success(`${intl.formatMessage({ id: 'login.loginSuccess' })}`);
        navigate('/');
      }
    } catch (error) {
      // console.error(error);
      const error_msg = error.response.data.message;
      if (error_msg === '密碼錯誤') {
        toast.error(`${intl.formatMessage({ id: 'login.wrongPassword' })}`);
      } else {
        toast.error(`${intl.formatMessage({ id: 'login.loginFail' })}`);
      }
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
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
            <Input
              type='password' // 設置為密碼輸入框
              id='password'
              value={password} // 設置為你的密碼 state 變數
              onChange={handlePasswordChange} // 設置密碼變化的事件處理函數
              placeholder={msg} // 設置密碼輸入框的占位符
            />
          }
        </FormattedMessage>

      </div>

      <Button
        style={{ width: '60%', height: '35px', margin: 'auto' }}
        onClick={handleFormSubmit}
        text={intl.formatMessage({ id: 'login.login' })}
      />
      
      <div className={loginStyles.hover__pointer} onClick={showModal}>{intl.formatMessage({ id: 'login.forgotPwd' })}</div>
      <ForgetPwd isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

    </div>
  );
};

export default LoginFormPwd;
