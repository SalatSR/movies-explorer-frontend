import './Section.css';

function Section(props) {


  const { title, children, dark, anchor } = props;

  return (
    <section className={`section ${dark ? 'section_dark' : ''}`}>
      <h2 className="section__header" id={`${anchor}`}>{title}</h2>
      {children}
    </section>
  )
}

export default Section;