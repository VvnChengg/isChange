import { FormattedMessage } from 'react-intl';

const EmailInput = ({ email, handleEmailChange }) => (
  <div className="login-form__input-group">
    <label htmlFor="email" className="login-form__label">
      <FormattedMessage id='email'/>
    </label>
    <FormattedMessage id='login.inputEmail'>
      {msg =>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="login-form__input"
          placeholder={msg}
        />
      }
    </FormattedMessage>
  </div>
);

export default EmailInput;