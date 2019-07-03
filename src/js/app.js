import {
    createListItem
} from "./view";
import Films from './Fims/Films'

const films = new Films();

films.getFilms().then(result =>
    result.forEach(item => createListItem(item))
);

import {
    refs
} from './constants';

refs.filmsList.addEventListener('click', openModal);

function openModal(event) {
    const targetCard = event.target.closest('li'); 
    const div = targetCard.querySelector('.card-wrap');

    div.classList.toggle('card-block');
    targetCard.classList.toggle('modal-card');  
}

// function openModal(event) {
//     const targetCard = event.target.closest('li');
//     if (targetCard.className !== 'modal-card') {
//         targetCard.classList.add('modal-card')
//         refs.filmsList.removeEventListener('click', openModal);  
//     }
// }