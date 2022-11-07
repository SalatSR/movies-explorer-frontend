import './NotFoundError.css';
import { NavLink } from 'react-router-dom'

function NotFoundError(props) {
  return (
    <section className="not-found-error">
      <div className="not-found-error__wrapper">
        <h2 className="not-found-error__title">404</h2>
        <p className="not-found-error__subtitle">Страница не существует</p>
      </div>
      <NavLink className="not-found-error__link" to="/">Назад</NavLink>
    </section>
  )
}

export default NotFoundError;