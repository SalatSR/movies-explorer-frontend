import "./Portfolio.css"

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__links-item">
          <a className="portfolio__link"
            href="https://SalatSR.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__links-item">
          <a className="portfolio__link"
            href="https://salatsr.github.io/hyperskill-intro-to-github/"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт (игра "Столицы")
          </a>
        </li>
        <li className="portfolio__links-item">
          <a className="portfolio__link"
            href="https://salatsr.github.io/hyperskill-intro-to-github-3/"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт (игра "Пианино")
          </a>
        </li>
        <li className="portfolio__links-item">
          <a className="portfolio__link"
            href="https://SalatSR.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__links-item">
          <a className="portfolio__link"
            href="https://SalatSR.github.io/react-mesto-auth"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;