import './AboutMe.css';
import aboutMeAvatar from '../../images/aboutMeAvatar.jpg';
import Section from '../Section/Section';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe(props) {
  return (
    <Section title="Студент" anchor="aboutMe">
      <div className="about-me__wrapper">
        <div className="about-me__info">
          <h3 className="about-me__title">Стас</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 30 года</p>
          <p className="about-me__paragraph">
            Я родился в г. Саранск, живу и работаю в г.Москва,
            закончил МГУПИ по специальности "Оптические технологии и материалы". Я люблю слушать музыку,
            смотреть фильмы, путешествовать.
            Во время обучения начал искать работу по новой профессии,
            планирую устроиться по новой специальности в кротчайшие сроки.
          </p>
          <ul className="about-me__social">
            <li className="about-me__social-item">
              <a className="about-me__social-link"
                href="https://github.com/salatsr"
                target="_blank"
                rel="noreferrer">
                Github
              </a>
            </li>
          </ul>
        </div>
        <img className="about-me__avatar" alt="Аватар пользователя" src={aboutMeAvatar} />
      </div>
      <Portfolio />
    </Section>
  )
}

export default AboutMe;
