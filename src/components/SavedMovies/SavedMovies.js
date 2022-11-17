import '../SearchForm/SearchForm';
import '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  return (
    <section className="saved-movies">
      <SearchForm
        isShortMovies={props.isShortMovies}
        toggleShortMovies={props.toggleShortMovies}
        handleSearchSavedMovies={props.handleSearchSavedMovies}
        isSavedMovies={true}
      />
      <MoviesCardList
        isSavedMovies={true}
        movies={props.movies}
        handleDeleteMovie={props.handleDeleteMovie}
      />
    </section>
  )
}

export default SavedMovies;