import {
    refs
} from './constants';
import {
    createElementWithClass,
    createListItem
} from './view';
import * as api from './services/api';
import {
    string
} from 'postcss-selector-parser';


export const onSearch = event => {
    event.preventDefault();

    const value = refs.searchInput.value.trim();
    refs.filmsList.innerHTML = '';
    Array.from(refs.mainSection.children).forEach(child => child.textContent.includes('Sorry, no films are found... :(') || child.textContent.includes('films were found') ? child.remove() : null)


    if (value !== '') {
        api.searchFilm(value).then(films => {

            if (films.results.length < 1) {
                const noFilmText = createElementWithClass('h2', 'film-not-found');
                const noFilmDiv = createElementWithClass('div', 'outer-div');
                const innerDiv = createElementWithClass('div', 'film-not-found-div');
                noFilmDiv.prepend(noFilmText, innerDiv);
                noFilmText.textContent = "Sorry, no films are found... :(";
                refs.mainSection.prepend(noFilmDiv)
            } else {
                films.results.forEach(film => createListItem(film))
                const result = films.total_results.toString().split('');

                switch (result.length) {
                    case 7:
                        result.splice(4, 0, ' ');
                        break;
                    case 6:
                        result.splice(3, 0, ' ');
                        break;
                    case 5:
                        result.splice(2, 0, ' ');
                        break;
                    case 4:
                        result.splice(1, 0, ' ');
                        break;
                }

                refs.mainSection.insertAdjacentHTML('afterbegin', `<p class="total-films">${result.join('')} films were found.</p>`)
            }
        })
    } else {
        api.getFilms().then(films => films.results.forEach(film => createListItem(film)))
    };
}