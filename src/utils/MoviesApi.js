import { MOVIESAPI_URL } from './constants';
export const getAllMovies = () => {
  return fetch(`${MOVIESAPI_URL}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });  
};