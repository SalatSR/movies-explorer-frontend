import "./MoviesCardList.css";
import MoviesCard from '../MoviesCard/MoviesCard';
import cardImage from '../../images/cardImage.png';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  return (
    <section className="movies-list">
      <Preloader />
      <ul className="movies-list__items">
        <li className="movies-list__list-item">
          <MoviesCard
            image={cardImage}
            isSaved={true}
            savedMovies={props.savedMovies}
          />
        </li>
        <li className="movies-list__list-item">
          <MoviesCard
            image={cardImage}
            savedMovies={props.savedMovies}
          />
        </li>
        <li className="movies-list__list-item">
          <MoviesCard
            image={cardImage}
            savedMovies={props.savedMovies}
          />
        </li>
      </ul>
      <button className={
        props.isSaved ?
          'movies-list__add-btn movies-list__add-btn_disabled'
          : 'movies-list__add-btn'
      }>
        Ещё
      </button>
    </section>
  )
}

export default MoviesCardList;