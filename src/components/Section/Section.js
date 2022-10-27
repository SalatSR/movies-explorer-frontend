import './Section.css';

function Section(props) {


  const { title, children, light, anchor } = props;

  return (
    <section className={`section ${light ? 'section_light' : ''}`}>
      <h2 className="section__header" id={`${anchor}`}>{title}</h2>
      {children}
    </section>
  )
}

export default Section;