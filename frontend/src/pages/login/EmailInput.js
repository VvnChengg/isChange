import { FormattedMessage } from 'react-intl';
import loginStyles from '../../styles/LoginForm.module.css';

const EmailInput = ({ email, handleEmailChange }) => (
  <div className={loginStyles.loginForm__inputGroup}>
    <label htmlFor="email" className={loginStyles.loginForm__label}>
      <FormattedMessage id='email'/>
    </label>
    <FormattedMessage id='login.inputEmail'>
      {msg =>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className={loginStyles.loginForm__input}
          placeholder={msg}
        />
      }
    </FormattedMessage>
  </div>
);

export default EmailInput;