import '../AuthForm/AuthForm.css';
import './Login.css';
import { useValidationForm } from '../../hooks/useValidationForm';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';

function Login(props) {

  const { values, handleErrors, errors, isValid } = useValidationForm();

  function loginUser(e) {
    e.preventDefault();
    props.loginUser(values.email, values.password);
  }

  return (
    // <AuthForm
    //   title="Рады видеть!"
    //   btnText="Войти"
    //   subtitleText="Еще не зарегистрированы?"
    //   linkText="Регистрация"
    //   route="/signup"
    // >
    //   <fieldset className="auth__fieldset login__fieldset">
    <section className="auth">
      <div className="auth__wrapper">
        <Logo />
        <h2 className="auth__title">Рады видеть!</h2>
        <form className="auth__form" onSubmit={loginUser}>
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
          <button className={`${isValid ? "auth__submit" : "auth__submit auth__submit_disabled"}`} disabled={!isValid} type="submit">Войти</button>
        </form>
        <p className="auth__tip">Ещё не зарегистрированы? <NavLink className="auth__link" activeClassName="register__link_active" to='/signup'>Регистрация</NavLink></p>
      </div>
    </section>
  )
}

export default Login;