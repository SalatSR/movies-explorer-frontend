import { MAINAPI_URL } from './constants';

class MainApi {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    }
    
    return Promise.reject(`Error: ${res.status} ${res.statusText}`);    
  }

  /** Получаем данные пользователя */
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

  /** Обновляем данные пользователя */
  patchUserData(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
    .then(res => this._checkResponse(res))
  }

  /** Сохраняем фильм */
  saveMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    })
     .then(res => {
       return this._checkResponse(res);
     });
  };

  /** Выгружаем сохранённые фильмы */
  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      credentials: 'include',
      headers: this._headers
    })
     .then(res => {
       return this._checkResponse(res);
     });
  };

  /** Удаляем фильм из сохранённых */
  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers
    })
     .then(res => {
       return this._checkResponse(res);
     });
  };

  /** Выход */
  exit(signout) {
    return fetch(`${this._url}${signout}`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }
}

const api = new MainApi({
  baseUrl: `${MAINAPI_URL}`,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;