import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom'; // 匯入 useHistory 鉤子
import '../../styles/LoginForm.css';
import LoginFormPwd from './LoginFormPwd'; // 匯入密碼表單元件

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false); // 狀態用於顯示/隱藏密碼表單
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUseEmailAuth = () => {
    // 模擬從資料庫中獲取使用者資訊的邏輯
    const userInfo = getUserInfoFromDatabase(email); // 假設這個函數是用來從資料庫中獲取使用者資訊的
    if (userInfo) {
      // 如果使用者資訊存在，則直接顯示密碼輸入表單
      setShowPasswordForm(true);
    } else {
      // 如果使用者資訊不存在，執行其他登入邏輯（例如發送驗證郵件等）
      // 實現使用電子郵件登入的邏輯
      console.log('電子信箱建立新帳號:', email);
      // 在這裡檢查電子郵件地址是否有效
      // 如果有效，顯示密碼輸入表單，同時隱藏整個登入表單
      // setShowPasswordForm(true);
      // 導航到註冊頁面
      navigate('/register');
    }
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
                placeholder="請輸入電子信箱"
              />
            </div>
            <button onClick={handleUseEmailAuth} className="login-form__button">
              使用電子信箱登入
            </button>
            <label className="login-form__label">
                或
              </label>
            <button onClick={handleUseGoogleAuth} className="login-form__button">
              使用 Google 帳號登入
            </button>
          </div>
        </>
      )}
      {showPasswordForm && <LoginFormPwd email={email}/>} {/* 根據狀態來決定是否渲染密碼表單 */}
    </div>
  );
};

// 模擬從資料庫中獲取使用者資訊的函數
const getUserInfoFromDatabase = (email) => {
  // 在這裡實現從資料庫中獲取使用者資訊的邏輯，返回使用者資訊或者 null
  return null; // 假設使用者資訊不存在
};

export default LoginForm;
