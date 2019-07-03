import {getFilms} from './services/api';
import {createListItem} from './view';
import {refs} from './constants';

const films = getFilms().then(result => result.results.forEach(item => createListItem(item)));



refs.filmsList.addEventListener('click', (event) => {
    const targetCard = event.target.closest('li');
    targetCard.classList.add('modal-card');
});