import '../../index.css';
import './App.css';
import '../Header/Header';
import { useState, useEffect } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFoundError from '../NotFoundError/NotFoundError';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import * as auth from '../../utils/auth';
import * as moviesApi from '../../utils/MoviesApi';
import api from '../../utils/MainApi';
import { useCallback } from 'react';

function App() {

  const history = useHistory();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSucced, setIsSucced] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesError, setMoviesError] = useState(false);
  const [moviesState, setMoviesState] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [editUserDataMessage, setEditUserDataMessage] = useState('');
  const [isLoad, setIsLoad] = useState(false);



  const checkToken = useCallback(async () => {
    return await api.getUserData()
  }, [])

  /** Проверяем наличие токена в хранилище,
  * сверяем токены на устройстве и сервере.
  * Отслеживаем переключение маршрутов.
  * Если есть логиним пользователя со страницы "/" на страницу "/movies"
  */
  useEffect(() => {
    (async () => {
      try {
        if (!isLoggedIn) {
          const result = await checkToken();
          setCurrentUser(result);
          setIsLoggedIn(true);
        } else if (!currentUser) {
          const result = await checkToken();
          setCurrentUser(result);
        }
      } catch (err) {
        setIsLoggedIn(false);
        console.log(`Error: ${err}`);
      } finally {
        setIsLoad(true);
      }

    })()
  }, [history, isLoggedIn, currentUser, checkToken]);

  /** Разлогиниваемся и чистим localStorage */
  useEffect(() => {
    if (location.pathname === '/signout') {
      api.exit('/signout')
        .then((res) => {
          localStorage.clear();
          setCurrentUser({});
          setMovies(null);
          setMoviesState(null);
          setSavedMovies(null);
          setIsLoggedIn(false);
        })
        .catch(err => console.log(`Error: ${err}`));
    }
  }, [location.pathname]);

  /** Регистрируем пользователя */
  function registerUser(name, email, password) {
    auth.signup(name, email, password)
      .then(() => {
        auth.signin(email, password)
          .then(currentUser => {
            setCurrentUser(currentUser);
            setIsLoggedIn(true);
            history.push('/movies');
          })
          .catch(err => {
            setIsLoggedIn(false);
            console.log(`Error: ${err}`);
          });
        setIsSubmitting(false);
        setRegisterMessage('');
      })
      .catch((err) => {
        if (err === 'Error: 400 Bad Request') {
          setRegisterMessage('Неправильные данные');
        } else if (err === 'Error: 409 Conflict') {
          setRegisterMessage('Пользователь с таким email уже существует');
        } else {
          setRegisterMessage('Что-то пошло не так, попробуйте снова');
        }

      })
      .finally(() => {
        setIsSubmitting(false);
      })
  };

  /** Авторизация пользователя */
  function loginUser(email, password) {
    return auth.signin(email, password)
      .then(currentUser => {
        setCurrentUser(currentUser);
        setIsLoggedIn(true);
        setLoginMessage('');
        history.push('/movies');
        getSavedMoviesFromServer();
      })
      .catch((err) => {
        setIsLoggedIn(false);
        if (err === "Error: 401 Unauthorized") {
          setLoginMessage("Неправильные почта или пароль");
        }
        else {
          setLoginMessage("Что-то пошло не так, попробуйте снова")
        }
      });
  }

  /** Состояние чекбокса короткометражек */
  function toggleShortMovies(e) {
    setIsShortMovies(e.target.checked);
  }

  /** Редактируем данные пользователя */
  function handleEditUserData(name, email) {
    api.patchUserData(name, email)
      .then((res) => {
        if (res.message) {
          setEditUserDataMessage(res.message);
          setIsSucced(false);
        }
        setCurrentUser(res);
        setEditUserDataMessage('Данные успешно обновлены');
        setIsSucced(true);
      })
      .catch((err) => {
        setEditUserDataMessage('Что-то пошло не так');
        setIsSucced(false);
      })
  }

  /** Выгружаем данные из localStorage */
  const parseLocalStorage = useCallback((itemName) => {
    try {
      return JSON.parse(localStorage.getItem(itemName));
    } catch (err) {
      console.log(`Error: ${err}`);
      return null;
    }
  }, []);

  /** Загружаем в  localStorage сохранённые фильмы с сервера после разлогинивания */
  const getSavedMoviesFromServer = useCallback(() => {
    api.getSavedMovies()
      .then((savedMovies) => {
        setLocalStorage('savedMovies', savedMovies);
        const movies = parseLocalStorage('savedMovies');
        setSavedMovies(movies);
      })
      .catch(err => console.log(`Error: ${err}`));
  }, [parseLocalStorage]);

  /** Пишем данные в localStorage */
  function setLocalStorage(itemName, data) {
    return localStorage.setItem(itemName, JSON.stringify(data));
  };

  /** Поиск фильмов по ключевому слову */
  function searchMoviesByKeyword(movies, keyword) {
    let foundMovies = [];


    movies.forEach((movie) => {

      const nameEnToLowerCase = movie.nameEN.toLowerCase();
      const nameRuToLowerCase = movie.nameRU.toLowerCase();
      const keywordToLowCase = keyword.toLowerCase();

      if (nameEnToLowerCase.includes(keywordToLowCase) || nameRuToLowerCase.includes(keywordToLowCase)) {
        if (isShortMovies) {
          movie.duration <= 40 && foundMovies.push(movie);
        }
        else {
          foundMovies.push(movie);
        }
      }
    })

    return foundMovies;
  }

  /** Поиск фильмов */
  function searchMovies(keyword) {
    setIsLoading(true);
    setMovies([]);
    setIsNotFound(false);
    setMoviesError(false);

    /** Проверяем, есть ли полученные со стороннего сервиса массив фильмов
     * если нет - запрашиваем из стороннего сервиса
     * если есть - работаем с ними
     */
    if (moviesState.length === 0) {
      moviesApi.getAllMovies()
        .then(resMovies => {
          setMoviesState(resMovies);
          const searchResult = searchMoviesByKeyword(resMovies, keyword);

          if (searchResult.length === 0) {
            setIsNotFound(true);
            setMovies([]);
          }
          else {
            setLocalStorage('movies', searchResult);
            setMovies(parseLocalStorage('movies'));
          }
        })
        .catch(err => {
          setMoviesError(true);
          setMovies([]);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
    else {
      const searchResult = searchMoviesByKeyword(moviesState, keyword);

      if (searchResult.length === 0) {
        setMovies([]);
        setIsLoading(false);
        setIsNotFound(true);
      }
      else if (searchResult.length !== 0) {
        setLocalStorage('movies', searchResult);
        setMovies(parseLocalStorage('movies'));
        setIsLoading(false);
      }
      else {
        setMoviesError(true);
        setMovies([]);
      }
    }
  }

  /** Поиск среди сохранённых фильмов */
  function searchSavedMovies(keyword) {
    const movies = parseLocalStorage('savedMovies');
    const searchResult = searchMoviesByKeyword(movies, keyword);
    setSavedMovies(searchResult);
  }

  /** Обновляем данные на сервере новыми сохранёнными фильмами */
  function saveMovie(movie) {
    api.saveMovie(movie)
      .then((data) => {
        const movies = [...savedMovies, data];
        setSavedMovies(prev => ([...prev, data]));
        setLocalStorage('savedMovies', movies)
      })
      .catch(err => console.log(`Error: ${err}`));
  };

  /** Удаляем фильм на своём сервере */
  function deleteMovie(movieId) {
    api.deleteMovie(movieId)
      .then((res) => {
        const filteredsavedMovies = savedMovies.filter((item) => {
          return item._id !== movieId
        });
        setSavedMovies(filteredsavedMovies);
        setLocalStorage('savedMovies', filteredsavedMovies);
      })
      .catch(err => console.log(`Error: ${err}`));
  };

  /** Выгружаем из localStorage фильмы на страницу '/saved-movies'
   * после разлогинивания пользователя
   * или
   * при переходе на страницу сохранённых фильмов
   */
  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      const movies = parseLocalStorage('savedMovies')
      if (!movies && movies.length === 0) {
        getSavedMoviesFromServer();
      }
      else {
        setSavedMovies(movies);
      }
    }
  }, [history, location.pathname, parseLocalStorage, getSavedMoviesFromServer]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <div className='app__container'>
          {location.pathname === '/' ||
            location.pathname === '/movies' ||
            location.pathname === '/profile' ||
            location.pathname === '/saved-movies' ?
            isLoggedIn ?
              <Header isLoggedIn={isLoggedIn} />
              :
              <Header />
            :
            ''
          }
          <main>
            <Switch>
              <Route exact path='/' >
                <Main />
              </Route>
              <ProtectedRoute path='/profile' isLoggedIn={isLoggedIn} isLoad={isLoad} >
                <Profile
                  isSubmitting={isSubmitting}
                  isSucced={isSucced}
                  editUserDataMessage={editUserDataMessage}
                  handleEditUserData={handleEditUserData}
                />
              </ProtectedRoute>
              <ProtectedRoute path='/movies' isLoggedIn={isLoggedIn} isLoad={isLoad} >
                <Movies
                  isLoading={isLoading}
                  movies={movies}
                  moviesError={moviesError}
                  isNotFound={isNotFound}
                  isShortMovies={isShortMovies}
                  toggleShortMovies={toggleShortMovies}
                  handleSearchMovies={searchMovies}
                  handleSaveMovie={saveMovie}
                  handleDeleteMovie={deleteMovie}
                />
              </ProtectedRoute>
              <ProtectedRoute path='/saved-movies' isLoggedIn={isLoggedIn} isLoad={isLoad} >
                <SavedMovies
                  movies={savedMovies}
                  moviesError={moviesError}
                  isNotFound={isNotFound}
                  isShortMovies={isShortMovies}
                  toggleShortMovies={toggleShortMovies}
                  handleSearchSavedMovies={searchSavedMovies}
                  handleDeleteMovie={deleteMovie}
                />
              </ProtectedRoute>
              <ProtectedRoute path='/signout' isLoggedIn={false} isLoad={true} />
              <Route exact path='/signup'>
                <Register
                  registerUser={registerUser}
                  errorMessage={registerMessage}
                  isSubmitting={isSubmitting} />
              </Route>
              <Route exact path='/signin'>
                <Login
                  loginUser={loginUser}
                  errorMessage={loginMessage}
                  isSubmitting={isSubmitting} />
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
    </CurrentUserContext.Provider>
  );
}

export default App;