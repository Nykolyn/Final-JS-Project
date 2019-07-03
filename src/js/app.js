import {
    getFilms
} from './services/api';
import {
    createListItem
} from './view';
import {
    refs
} from './constants';

const films = getFilms().then(result => result.results.forEach(item => createListItem(item)));



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