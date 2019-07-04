import {
    API
} from '../constants';

import {
    refs
} from '../constants';

const FAVOURITE_FILMS_URL = 'http://localhost:3000/films';
const USER_URL = 'http://localhost:3000/users';

export const getFilms = () => {
    return fetch(API).then(response => {
        if (response.ok) return response.json();
        throw new Error("Error while fetching " + response.statusText);
    });
};

export const getComments = async (id) => {
    try {
        const result = await fetch(USER_URL);
        const user = result.json();
        return user;
    } catch (error) {
        throw new Error('Error while getting comments', error)
    }
}

export const commentFilm = async (id, comment) => {
    const options = {
        method: 'PATCH',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    };

    try {
        const result = await fetch(`${USER_URL}/${id}`, options);
        const user = result.json();
        const test = user.map(user => user.comments)
        return test;
    } catch (error) {
        throw console.error('error while updating comment', error);
    }
};


// ______________________________________________________________________

// Authentication 
export const postUser = async (user) => {
    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
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
        const response = await fetch(USER_URL)
        const users = response.json()
        return users
    } catch (err) {
        throw err;
    }
};