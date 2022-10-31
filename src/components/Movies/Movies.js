import '../SearchForm/SearchForm';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
  return (
  <section className="movies">
    <SearchForm />
    <MoviesCardList />
  </section>
  )
}

export default Movies;