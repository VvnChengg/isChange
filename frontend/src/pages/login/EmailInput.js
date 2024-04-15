// EmailInput.js
import React from 'react';

const EmailInput = ({ email, handleEmailChange }) => (
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
);

export default EmailInput;