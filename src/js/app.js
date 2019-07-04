import {
    createListItem
} from "./view";
import Films from './Fims/Films';
import {refs} from './constants';

const films = new Films();

films.getFilms().then(result =>
    result.forEach(item => createListItem(item))
);

// timer
