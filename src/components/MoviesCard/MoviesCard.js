import "./MoviesCard.css";
import image from '../../images/notFoundImage.jpg';
import { useState, useEffect } from 'react';

function MoviesCard(props) {

  const [isSaved, setIsSaved] = useState(false);

  const cinema = {
    country: props.movie.country || 'Страна',
    director: props.movie.director || 'Режиссер',
    duration: props.movie.duration || 0,
    year: props.movie.year || 'Не указано',
    description: props.movie.description || 'Описание',
    image: `${props.movie.image === null ? `${image}` : `https://api.nomoreparties.co${props.movie.image?.url}`}`,
    trailerLink: props.movie?.trailerLink,
    nameRU: props.movie.nameRU || 'Название Рус',
    nameEN: props.movie.nameEN || 'Название Англ',
    thumbnail: `https://api.nomoreparties.co${props.movie.image?.formats?.thumbnail?.url}`,
    movieId: props.movie.id,
  }

  const transformedTime = `${Math.trunc(cinema.duration / 60)}ч ${cinema.duration % 60}м`;

  /** Подсвечиваем фильм "лайком" при выводе результата поиска во вкладке '/movies', если он есть в localStorage */
  function isLikedMovie() {
    if (localStorage.getItem('savedMovies')) {
      let savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
      if (savedMovies.some(movie => (movie.nameRU === props.movie.nameRU) || (movie.nameEN === props.movie.nameEN))) {
        setIsSaved(true);
      }
    }
  }

  /** Сохраняем фильм */
  function handleSaveMovie() {
    props.handleSaveMovie(cinema);
    setIsSaved(true);
  }

  /** Удаляем фильм */
  function handleDeleteMovie() {
    setIsSaved(false);
    props.handleDeleteMovie(props.movie._id);
  }

  /** Удаляем фильм снятием "лайка" */
  function handleDislikeMovie() {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const card = savedMovies.find(movie => (movie.nameRU === props.movie.nameRU) || (movie.nameEN === props.movie.nameEN));
    props.handleDeleteMovie(card._id);
    setIsSaved(false);
  }

  useEffect(() => {
    isLikedMovie();
  }, []);

  return (
    <div className="card">
      <div className="card__wrapper">
        <h2 className="card__title">{props.movie.nameRU || props.movie.nameEN}</h2>
        <p className="card__time">{`${transformedTime}`}</p>
      </div>
      <a
        className="card__image-link"
        target="_blank"
        rel="noreferrer"
        href={props.isSavedMovies ?
          props.movie.trailerLink
          :
          props.movie.trailerLink}>
        <img className="card__image" src={props.isSavedMovies ? props.movie.image : cinema.image} alt="Плакат фильма" />
      </a>
      {props.isSavedMovies ?
        <button
          className="card__delete-button"
          type="button"
          onClick={handleDeleteMovie}>
        </button>
        :
        <button
          className={isSaved ? 'active-button' : 'card__save-button'}
          onClick={!isSaved ? handleSaveMovie : handleDislikeMovie}
          type="button">{isSaved ? '' : 'Сохранить'}
        </button>}
    </div>
  )
}

export default MoviesCard;