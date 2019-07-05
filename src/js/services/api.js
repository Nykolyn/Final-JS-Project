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

export const commentFilm = async (id, comment) => {
    const options = {
        method: 'PATCH',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
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
    comment: 'film govno'
})


//modal card 
// console.log(refs.filmsList);
refs.filmsList.addEventListener('click', openCard);

function openCard(event) {
    const targetCard = event.target.closest('li');
    const targetDiv = targetCard.querySelector('.card-wrap');

    targetCard.classList.toggle('modal-card');
    targetDiv.classList.toggle('card-block');
}

// function openCard(event) {
//     const targetCard = event.target.closest('li');
//     const targetDiv = targetCard.querySelector('.card-wrap');
//     const exitButton = document.querySelector('.exit-button');
    
//     if (event.target === exitButton) {
//         targetCard.classList.remove('modal-card')
//         targetDiv.classList.remove('card-block');
//     }

//     console.log(event.target);

//     if (!targetCard.className.includes('modal-card')) {
//         targetCard.classList.add('modal-card');
//         targetDiv.classList.add('card-block');
//         // refs.filmsList.removeEventListener('click', openCard);
//     }
// }
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
// export const patchUser=(id,data)=>{
//     const settings = {
// 		method: 'PATCH',
// 		headers: {
// 			'Content-type': 'application/json'
// 		},
// 		body: JSON.stringify(data)
// 	};
// 	try {
// 		const response = await fetch(`${USER_URL}/${id}`, settings);
// 		const users = response.json();
// 		return users;
// 	} catch (err) {
// 		throw err;
// 	}
// }g
getUser().then(data =>{})


// _______________________________________________________________________
