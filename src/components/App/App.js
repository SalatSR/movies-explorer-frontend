import '../../index.css';
import './App.css';
import '../Header/Header';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFoundError from '../NotFoundError/NotFoundError';

function App() {

  let location = useLocation();

  return (
    <div className='app'>
      <div className='app__container'>
        {location.pathname === '/profile' ||
          location.pathname === '/movies' ||
          location.pathname === '/saved-movies' ?
          <Header isLoggedIn={true} />
          :
          location.pathname === '/' ?
            <Header />
            :
            ''}
        <main>
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies />
            </Route>
            <Route path='/signup'>
              <Register />
            </Route>
            <Route path='/signin'>
              <Login />
            </Route>
            <Route path="*">
              <NotFoundError />
            </Route>
          </Switch>
        </main>
        {location.pathname === '/' ||
          location.pathname === '/movies' ||
          location.pathname === '/saved-movies' ?
          <Footer />
          :
          ''}
      </div>
    </div>
  );
}

export default App;