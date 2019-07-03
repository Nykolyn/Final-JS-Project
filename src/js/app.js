import {
    createListItem
} from "./view";
import Films from './Fims/Films'

const films = new Films();

films.getFilms().then(result =>
    result.forEach(item => createListItem(item))
);

films.updateComment(1, {
    comment: 'test'
}).then()

// timer