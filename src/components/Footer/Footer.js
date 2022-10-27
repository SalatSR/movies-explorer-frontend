import './Footer.css';

function Footer(props) {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__bottom-row">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li className="footer__links-item">
            <a className="footer__link"
              href="https://praktikum.yandex.ru/"
              target="_blank"
              rel="noreferrer">
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__links-item">
            <a className="footer__link"
              href="https://github.com/salatsr"
              target="_blank"
              rel="noreferrer">
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;