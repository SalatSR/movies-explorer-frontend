import '../../index.css';
import './App.css';
import '../Header/Header';
import { Route, Switch } from 'react-router-dom';
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
  return (
    <div className='app'>
      <div className='app__container'>

        <Switch>
          <Route exact path='/'>
            <Header />
            <Main />
            <Footer />
          </Route>
          <Route path='/profile'>
            <Header isLoggedIn={true}/>
            <Profile />
          </Route>
          <Route path="/movies">
            <Header isLoggedIn={true}/>
            <Movies />
            <Footer/>
          </Route>
          <Route path="/saved-movies">
            <Header isLoggedIn={true}/>
            <SavedMovies/>
            <Footer/>
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

      </div>
    </div>
  );
}

export default App;