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

// function openCard(event) {
//     const targetCard = event.target.closest('li');
//     const targetDiv = targetCard.querySelector('.card-wrap');

//     targetCard.classList.toggle('modal-card');
//     targetDiv.classList.toggle('card-block');
// }

function openCard(event) {
    // console.log(event.target);

    const targetCard = event.target.closest('li');
    const targetDiv = targetCard.querySelector('.card-wrap');
    const exitButton = targetCard.querySelector('.exit-button');

    if (!targetCard.className.includes('modal-card')) {
        targetCard.classList.add('modal-card');
        targetDiv.classList.add('card-block');
        //toggle event click 
        refs.filmsList.removeEventListener('click', openCard);
        refs.filmsList.addEventListener('click', closedCard);

        function closedCard(event) {
            if (event.target === exitButton) {
                targetCard.classList.remove('modal-card')
                targetDiv.classList.remove('card-block');
                //toggle event click 
                refs.filmsList.removeEventListener('click', closedCard);
                refs.filmsList.addEventListener('click', openCard);
            }
        }
    }

    console.log(event);
    // console.log('pageYOffset', pageYOffset);   
    // console.log(event.layerY);
    // console.log(event.offsetY);
    // console.log(screenY);
    // console.log('pageY :', event.pageY);
    // console.log(event.y);
    // console.log(event.target);
    // console.log(targetCard.style);

    // var element = document.getElementById('image_1'),

    const cardStyle = window.getComputedStyle(targetCard);
    // const top = style.getPropertyValue('top');

    
    
    
     
}