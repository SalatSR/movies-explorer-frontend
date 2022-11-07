import "./Profile.css";
import { NavLink } from 'react-router-dom';

function Profile(props) {
  return (
    <>
      <section className="profile">
        <h1 className="profile__title">Привет, Стас!</h1>
        <form className="profile__form" name="profileForm">
          <label htmlFor="name" className="profile__input-label">Имя
            <input
              className="profile__input"
              id="name"
              autoComplete="off"
              type="text"
              placeholder="Введите имя"
            />
          </label>
          <label htmlFor="email" className="profile__input-label">E-mail
            <input
              className="profile__input"
              id="email"
              autoComplete="off"
              type="email"
              placeholder="Введите email"
            />
          </label>
          <button className="profile__form-submit" type="submit">Редактировать</button>
        </form>
        <NavLink
          className="profile__signout-link"
          activeClassName="profile__signout-link_active"
          to="/signin"
        >
          Выйти из аккаунта
        </NavLink>
      </section>
    </>
  )
}

export default Profile;