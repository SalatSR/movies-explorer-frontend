import './Register.css';
import { useValidationForm } from '../../hooks/useValidationForm';
import AuthForm from '../AuthForm/AuthForm';

function Register(props) {

  const { values, handleErrors, errors } = useValidationForm();

  return (
    <AuthForm
      title="Добро пожаловать!"
      btnText="Зарегистрироваться"
      subtitleText="Уже зарегистрированы?"
      linkText="Войти"
      route="/signin"
    >
      <fieldset className="register__fieldset auth__fieldset">
        <label htmlFor="name" className="auth__label">Имя
          <input
            className="auth__input"
            autoComplete="off"
            type="text"
            name="name"
            id="name"
            required
            value={values.name || ''}
            onChange={handleErrors}
          />
          <span className="auth__input-error">{errors.name}</span>
        </label>
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

export default Register;