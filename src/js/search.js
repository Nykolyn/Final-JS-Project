import {
    refs
} from './constants';
import {
    createElementWithClass,
    createListItem
} from './view';
import * as api from './services/api';


export const onSearch = event => {
    event.preventDefault();

    const value = refs.searchInput.value.trim();
    refs.filmsList.innerHTML = '';
    Array.from(refs.mainSection.children).forEach(child => child.textContent === "Sorry, no films are found... :(" ? child.remove() : null)


        if (value !== '') {
            api.searchFilm(value).then(films => {
                if (films.results.length < 1) {
                        const noFilmText = createElementWithClass('h2', 'film-not-found');  
                        noFilmText.textContent = "Sorry, no films are found... :(";
                        refs.mainSection.prepend(noFilmText)
                } else {
                    films.results.forEach(film => createListItem(film))
                }
            })
        } else {
            api.getFilms().then(films => films.results.forEach(film => createListItem(film)))
        };
    
}