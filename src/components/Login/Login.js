import './Login.css';
import { useValidationForm } from '../../hooks/useValidationForm';
import AuthForm from '../AuthForm/AuthForm';

function Login(props) {

  const { values, handleErrors, errors } = useValidationForm();

  return (
    <AuthForm
      title="Рады видеть!"
      btnText="Войти"
      subtitleText="Еще не зарегистрированы?"
      linkText="Регистрация"
      route="/signup"
    >
      <fieldset className="auth__fieldset login__fieldset">
        <label htmlFor="email" className="auth__label">E-mail
          <input
            className="auth__input"
            autoComplete="off"
            type="email"
            name="email"
            id="email"
            required
            value={values.email || ''}
            onChange={handleErrors}
          />
          <span className="auth__input-error">{errors.email}</span>
        </label>
        <label htmlFor="password" className="auth__label">Пароль
          <input
            className="auth__input"
            autoComplete="off"
            type="password"
            name="password"
            id="password"
            required
            value={values.password || ''}
            onChange={handleErrors}
            minLength="4"
          />
          <span className="auth__input-error">{errors.password}</span>
        </label>
      </fieldset>
    </AuthForm>
  )
}

export default Login;