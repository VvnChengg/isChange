// AuthButton.js
import React from 'react';

const AuthButton = ({ handleAuth, label }) => (
  <button onClick={handleAuth} className='login-form__button'>
    {label}
  </button>
);

export default AuthButton;