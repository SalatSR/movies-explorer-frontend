import './Techs.css';
import Section from '../Section/Section';


function Techs(props) {
  return (
    <Section title="Технологии"  anchor="techs" light={true}>
      <div className="techs__wrapper">
        <p className="techs__header">7 технологий</p>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__cards">
          <li className="techs__card">HTML</li>
          <li className="techs__card">CSS</li>
          <li className="techs__card">JS</li>
          <li className="techs__card">React</li>
          <li className="techs__card">Git</li>
          <li className="techs__card">Express.js</li>
          <li className="techs__card">mongoDB</li>
        </ul>
      </div>
    </Section>
  )
}

export default Techs;