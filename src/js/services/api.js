import { API } from "../constants";

import { refs } from "../constants";

const FAVOURITE_FILMS_URL = "https://filmoteka-server.goit.co.ua/api/films";
const USER_URL = "https://filmoteka-server.goit.co.ua/api/users";
const COMMENTS_URL = "https://filmoteka-server.goit.co.ua/api/comments";
export const FIND_FILM_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=027ca1d5e779abba9fcdc8b6b57f2385&language=en-US&query=";

export const getFilms = () => {
  return fetch(API).then(response => {
    if (response.ok) return response.json();
    throw new Error("Error while fetching " + response.statusText);
  });
};

export const searchFilm = value => {
  return fetch(FIND_FILM_URL + value).then(response => {
    if (response.ok) return response.json();
  });
};

export const getFilmsFavorite = async () => {
  const response = await fetch(FAVOURITE_FILMS_URL);
  try {
    if (response.ok) {
      console.log(response);
      return response.json();
    }
  } catch (error) {
    throw error;
  }
};

export const getUserName = async id => {
  try {
    const result = await fetch(`${USER_URL}/${id}`);
    const user = result.json();
    return user;
  } catch (error) {
    throw new Error("Error while getting user", error);
  }
};

export const deleteFilm = async id => {
  const settings = {
    method: "DELETE"
  };
  const response = await fetch(`${FAVOURITE_FILMS_URL}/${id}`, settings);
  try {
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    throw error;
  }
};

export const getComments = async () => {
  try {
    const result = await fetch(COMMENTS_URL);
    const comments = result.json();
    return comments;
  } catch (error) {
    throw new Error("Error while getting comments", error);
  }
};

export const commentFilm = async comment => {
  const options = {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  };

  try {
    const result = await fetch(COMMENTS_URL, options);
    const comment = result.json();
    return comment;
  } catch (error) {
    throw console.error("error while updating comment", error);
  }
};

export const saveFilm = async film => {
  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(film)
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

// ______________________________________________________________________

// Authentication
export const postUser = async user => {
  const settings = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(user)
  };
  try {
    const response = await fetch(USER_URL, settings);
    const users = response.json();
    return users;
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
