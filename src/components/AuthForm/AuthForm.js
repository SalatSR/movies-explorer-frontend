import './AuthForm.css';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';

function AuthForm(props) {
  return (
    <section className="auth">
      <div className="auth__wrapper">
        <Logo />
        <h2 className="auth__title">{props.title}</h2>
        <form className="auth__form">
          {props.children}
          <button className="auth__submit" type="submit">{props.btnText}</button>
        </form>
        <p className="auth__subtitle-text">{props.subtitleText}
          <NavLink
            className="auth__link"
            activeClassName="register__link_active"
            to={props.route}>{props.linkText}
          </NavLink>
        </p>
      </div>
    </section>
  )
}

export default AuthForm;