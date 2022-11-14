import "./Profile.css";
import { useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useValidationForm } from '../../hooks/useValidationForm';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function Profile(props) {

  const { values, handleErrors, errors, isValid } = useValidationForm();
  const currentUser = useContext(CurrentUserContext);
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.handleEditUserData(values.name || currentUser.name, values.email || currentUser.email);
  }

  return (
    <>
      <section className="profile">
        <h1 className="profile__title">{`Привет ${currentUser.name}`}</h1>
        <form
          className="profile__form"
          name="profileForm"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="profile__input-label">Имя
            <input
              className="profile__input"
              id="name"
              autoComplete="off"
              type="text"
              name="name"
              placeholder="Введите имя"
              required
              ref={inputRef}
              minLength="3"
              onChange={handleErrors}
              defaultValue={currentUser.name}
            />
          </label>
          <span className="auth__input-error">{errors.name}</span>
          <label htmlFor="email" className="profile__input-label">E-mail
            <input
              className="profile__input"
              id="email"
              autoComplete="off"
              type="email"
              name="email"
              placeholder="Введите email"
              required
              ref={inputRef}
              onChange={handleErrors}
              defaultValue={currentUser.email}
            />
          </label>
          <span className="auth__input-error">{errors.email}</span>
          <span
            className={`profile__form-message ${props.isSucced ?
              'profile__form-message_succeed'
              :
              'profile__form-message_error'}`
            }>
            {props.editUserDataMessage}
          </span>
          <button
            className={`${isValid ?
              'profile__form-submit'
              :
              'profile__form-submit profile__form-submit_disabled'}`
            }
            type="submit"
            disabled={!isValid}
          >
            Редактировать
          </button>
        </form>
        <NavLink
          className="profile__signout-link"
          activeClassName="profile__signout-link_active"
          to="/signout"
        >
          Выйти из аккаунта
        </NavLink>
      </section>
    </>
  )
}

export default Profile;