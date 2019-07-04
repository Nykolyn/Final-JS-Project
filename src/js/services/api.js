import {
    API
} from '../constants';

import {
    refs
} from '../constants';

const FAVOURITE_FILMS_URL = 'http://localhost:3000/films';
const USER_URL = 'http://localhost:3000/users';
const COMMENTS_URL = 'http://localhost:3000/comments';

export const getFilms = () => {
    return fetch(API).then(response => {
        if (response.ok) return response.json();
        throw new Error("Error while fetching " + response.statusText);
    });
};

export const getComments = async () => {
    try {
        const result = await fetch(USER_URL);
        const comments = result.json();
        return comments;
    } catch (error) {
        throw new Error('Error while getting comments', error)
    }
}

export const commentFilm = async (id, comment) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    };

    try {
        const result = await fetch(COMMENTS_URL, options);
        const comment = result.json();
        return comment
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