import './SearchForm.css';
import searchIcon from '../../images/searchIcon.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  return (
    <section className="search">
      <form className="search__form">
        <img className="search__icon"
          src={searchIcon}
          alt="Поиск"
        />
        <input
          className="search__input"
          type="text"
          name="search"
          placeholder="Фильм"
        />
        <button className="search__submit" type="submit"></button>
        <div className="search__separator"></div>
        <FilterCheckbox />
      </form>
    </section>
  )
}

export default SearchForm;