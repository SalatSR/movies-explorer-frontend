import '../SearchForm/SearchForm';
import '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList savedMovies={true} isSaved={true}/>
    </section>
  )
}

export default SavedMovies;