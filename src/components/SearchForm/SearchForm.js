import './SearchForm.css';
import { useState } from 'react';
import searchIcon from '../../images/searchIcon.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useEffect } from 'react';

function SearchForm({ movieSearchKey, handleSearchMovies, ...props}) {

  const [searchInput, setSearchInput] = useState(movieSearchKey || '');
  const [isSearchFormValid, setIsSearchFormValid] = useState(true);

  useEffect(() => {
    if (movieSearchKey) {
      handleSearchMovies(movieSearchKey);
    }
  }, [movieSearchKey, handleSearchMovies]);

  /** Валидируем введенные данные */
  function handleChange(e) {
    setSearchInput(e.target.value);
    setIsSearchFormValid(e.target.checkValidity());
  }

  /** Передаём введенные данные для поиска фильма */
  function onSubmit(e) {
    e.preventDefault();
    handleSearchMovies(searchInput);
  }

  /** Передаём введенные данные для поиска фильма среди сохранённых */
  function onSubmitSavedMovies(e) {
    e.preventDefault();
    props.handleSearchSavedMovies(searchInput);
  }
  
  return (
    <section className="search">
      <form
        className="search__form"
        onSubmit={props.isSavedMovies ? onSubmitSavedMovies : onSubmit}
      >
        <img className="search__icon"
          src={searchIcon}
          alt="Поиск"
        />
        <input
          className="search__input"
          type="text"
          name="search"
          placeholder="Фильм"
          required
          onChange={handleChange}
          value={searchInput}
        />
        <span className={`search__input-error ${isSearchFormValid ?
          'search__input-error_hidden'
          :
          ''}`}>Это поле обязательно</span>
        <button className="search__submit" type="submit"></button>
        <div className="search__separator"></div>
        <FilterCheckbox
          toggleShortMovies={props.toggleShortMovies}
          isShortMovies={props.isShortMovies}
        />
      </form>
    </section>
  )
}

export default SearchForm;