import '../SearchForm/SearchForm';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {

  return (
  <section className="movies">
    <SearchForm
      handleSearchMovies={props.handleSearchMovies}
      isShortMovies={props.isShortMovies}
      toggleShortMovies={props.toggleShortMovies}
      movieSearchKey={props.movieSearchKey}
    />
    <MoviesCardList
      isLoading={props.isLoading}
      movies={props.movies}
      moviesError={props.moviesError}
      isNotFound={props.isNotFound}
      handleSaveMovie={props.handleSaveMovie}
      handleDeleteMovie={props.handleDeleteMovie}
    />
  </section>
  )
}

export default Movies;