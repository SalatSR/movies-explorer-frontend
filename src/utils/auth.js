import { MAINAPI_URL } from './constants';

/** Проверка статуса запроса */
function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error: ${res.status} ${res.statusText}`);
}

/** Регистрация */
export const signup = (name, email, password) => {
  return fetch(`${MAINAPI_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      password,
      email
    })
  })
    .then((res => checkResponse(res)))
};

/** Авторизация */
export const signin = (email, password) => {
  return fetch(`${MAINAPI_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password,
      email
    })
  })
    .then((res => checkResponse(res)))
};