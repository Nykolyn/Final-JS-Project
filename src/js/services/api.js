import { API } from '../constants';

import { refs } from '../constants';

const FAVOURITE_FILMS_URL = 'http://localhost:3000/films';
const USER_URL = 'http://localhost:3000/users';

export const getFilms = () => {
  return fetch(API).then(response => {
    if (response.ok) return response.json();
    throw new Error('Error while fetching ' + response.statusText);
  });
};

export const commentFilm = async (id, comment) => {
  const options = {
    method: 'PATCH',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  try {
    const result = await fetch(`${FAVOURITE_FILMS_URL}/${id}`, options);
    const film = result.json();

    return film;
  } catch (error) {
    throw console.error('error while updating comment', error);
  }
};

commentFilm(2, {
  comment: 'film govno',
});

// ______________________________________________________________________

// Authentication
export const postUser = async user => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  try {
    const response = await fetch(USER_URL, settings);
    const users = response.json();
    return users;
  } catch (err) {
    throw err;
  }
};

export const saveFilm = async film => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(film),
  };
  try {
    const response = await fetch(`${FAVOURITE_FILMS_URL}/`, settings);
    // console.log('SAVE', response);
    const films = response.json();
    // console.log(films);
    return films;
  } catch (err) {
    throw err;
  }
};

export const updateUser = async (id, film) => {
  const settings = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(film),
  };
  try {
    const response = await fetch(`${USER_URL}/${id}`, settings);
    const films = response.json();
    return films;
  } catch (err) {
    throw err;
  }
};
export const getUser = async () => {
  try {
    const response = await fetch(USER_URL);
    const users = response.json();
    return users;
  } catch (err) {
    throw err;
  }
};
// _______________________________________________________________________
