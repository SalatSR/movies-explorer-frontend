import "./MoviesCardList.css";
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useState, useEffect } from 'react';

function MoviesCardList(props) {

  /** Отслеживаем количество фильмов при изменении состояния ширины экрана */
  const [initialCardsAmount, setInitialCardsAmount] = useState(() => {
    const size = window.innerWidth;
    if (size < 720) {
      return 5;
    }
    else if (size < 920) {
      return 8;
    }
    else if (size < 1279) {
      return 12;
    }
    else if (size > 1279) {
      return 12;
    }
  });

  const [addCardsAmount, setAddMoreCardsAmount] = useState(() => {
    const size = window.innerWidth;
    if (size < 720) {
      return 2;
    }
    else if (size < 920) {
      return 2;
    }
    else if (size < 1279) {
      return 3;
    }
    else if (size > 1279) {
      return 4;
    }
  });


  /** Задаём количество фильмов под размеры экрана */
  function handleResize() {
    const size = window.innerWidth;
    if (size < 720) {
      setInitialCardsAmount(5);
      setAddMoreCardsAmount(2);
    }
    else if (size < 920) {
      setInitialCardsAmount(8);
      setAddMoreCardsAmount(2);
    }
    else if (size < 1279) {
      setInitialCardsAmount(12);
      setAddMoreCardsAmount(3);
    }
    else if (size > 1279) {
      setInitialCardsAmount(12);
      setAddMoreCardsAmount(4);
    }
  };

  /** Догружаем карточки кнопкой "Ещё" */
  function handleAddMovies() {
    setInitialCardsAmount(prev => prev + addCardsAmount);
  }

  const renderedMovies = props.movies && props.movies.slice(0, initialCardsAmount);

  /** Отслеживаем изменение ширины окна браузера */
  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, [])

  return (
    <section className="movies-list">
      <Preloader isLoading={props.isLoading} />
      <span className={`movies-list__error ${props.moviesError ? '' : 'hidden'}`}>
        Во время запроса произошла ошибка.
        Возможно, проблема с соединением или сервер недоступен.
        Подождите немного и попробуйте ещё раз
      </span>
      <span className={`movies-list__not-found ${props.isNotFound ? '' : 'hidden'}`}>
        Ничего не найдено
      </span>
      <span className={`movies-list__no-saved-films ${(props.isSavedMovies && props.movies.length === 0) ? '' : 'hidden'}`}>
        У Вас ещё нет сохранённых фильмов
      </span>
      <ul className="movies-list__items">
        {renderedMovies && renderedMovies.map((movie) => {
          return (
            <li className="movies-list__list-item"
              key={props.isSavedMovies ? movie.movieId : movie.id}>
              <MoviesCard
                movie={movie}
                handleSaveMovie={props.handleSaveMovie}
                handleDeleteMovie={props.handleDeleteMovie}
                isSavedMovies={props.isSavedMovies}
              />
            </li>
          )
        })}
      </ul>
      <button
        className={
          `movies-list__add-btn ${props.movies && props.movies.length === renderedMovies.length ?
            ' movies-list__add-btn_disabled'
            :
            ''}`
        }
        onClick={handleAddMovies}
      >
        Ещё
      </button>
    </section>
  )
}

export default MoviesCardList;