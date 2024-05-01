import { FormattedMessage } from 'react-intl';
import loginStyles from '../../styles/LoginForm.module.css';

import { Input } from 'antd';

const EmailInput = ({ email, handleEmailChange }) => (
  <div className={loginStyles.loginForm__inputGroup}>
    <label htmlFor='email' className={loginStyles.loginForm__label}>
      <FormattedMessage id='email'/>
    </label>
    <FormattedMessage id='login.inputEmail'>
      {msg =>
        <Input
          type='email'
          id='email'
          value={email}
          onChange={handleEmailChange}
          placeholder={msg}
        />
      }
    </FormattedMessage>
  </div>
);

export default EmailInput;