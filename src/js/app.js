import {getFilms} from './services/api';
import {createListItem} from './view';

const films = getFilms().then(result => result.results.forEach(item => createListItem(item)));
