import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 匯入 useHistory 鉤子
import '../../styles/LoginForm.css';
import LoginFormPwd from './LoginFormPwd'; // 匯入密碼表單元件
import EmailInput from './EmailInput';
import AuthButton from './AuthButtons';
import { loginApi } from '../../api/loginApi';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false); // 狀態用於顯示/隱藏密碼表單
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  // 模擬從資料庫中獲取使用者資訊的函數
  const getUserInfoFromDatabase = async (email) => {
    try {
      const data = await loginApi.login_or_register(email);
      console.log(data);
      if (data && data.error) {
        // Handle error in data
        console.error('Error in data:', data.error);
      } else {
        setShowPasswordForm(true);
      }
      return data;
    } catch (error) {
      // Handle error
      if (error.response && error.response.data.status === 'None') {
        // 如果使用者資訊不存在，執行其他登入邏輯（例如發送驗證郵件等）
        // 實現使用電子郵件登入的邏輯
        console.log('電子信箱建立新帳號:', email);
        navigate('/register');
      } else {
        console.error('Error getting user info:', error);
      }
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
    <div>
      {!showPasswordForm && (
        <>
          <div className={`login-form ${showPasswordForm ? 'hidden' : ''}`}>
            <h2 className="login-form__title">登入或建立帳號</h2>
            <EmailInput email={email} handleEmailChange={handleEmailChange} />
            <AuthButton handleAuth={handleUseEmailAuth} label="使用電子信箱登入" />
            <label className="login-form__label">
              或
            </label>
            <AuthButton handleAuth={handleUseGoogleAuth} label="使用 Google 帳號登入" />
          </div>
        </>
      )}
      {showPasswordForm && <LoginFormPwd email={email} />} {/* 根據狀態來決定是否渲染密碼表單 */}
    </div>
  );
};

export default LoginForm;
