import './Register.css';
import '../AuthForm/AuthForm.css';
import { regularExpOfMail } from '../../utils/regularExp';
import { useValidationForm } from '../../hooks/useValidationForm';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';

function Register(props) {

  const { values, handleErrors, errors, isValid } = useValidationForm();

  function registerUser(e) {
    e.preventDefault();
    props.registerUser(values.name, values.email, values.password);
  }

  return (
    <section className="auth">
      <div className="auth__wrapper">
        <Logo />
        <h2 className="auth__title">Добро пожаловать!</h2>
        <form className="auth__form" onSubmit={registerUser}>
          <fieldset className="auth__fieldset register__fieldset">
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
                disabled={props.isSubmitting}
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
                pattern={regularExpOfMail}
                value={values.email || ''}
                onChange={handleErrors}
                disabled={props.isSubmitting}
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
                disabled={props.isSubmitting}
              />
              <span className="auth__input-error">{errors.password}</span>
            </label>
          </fieldset>
          <span className="auth__submit-error">{props.errorMessage}</span>
          <button
            className={`${isValid ?
              "auth__submit"
              :
              "auth__submit auth__submit_disabled"}`}
            type="submit"
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </form>
        <p
          className="auth__tip">Уже зарегистрированы?
          <NavLink
            className="auth__link"
            activeClassName="register__link_active"
            to='/signin'
          >
            Войти
          </NavLink>
        </p>
      </div>
    </section>
  )
}

export default Register;