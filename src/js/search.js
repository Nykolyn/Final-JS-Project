import {
    refs
} from './constants';
import {
    createElementWithClass,
    createListItem
} from './view';
import * as api from './services/api';


export const onSearch = (event) => {
    const value = event.target.value.trim()
    refs.filmsList.innerHTML = '';

    if (value !== '') {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=027ca1d5e779abba9fcdc8b6b57f2385&language=en-US&query=${value}`).then(response => {
            if (response.ok) return response.json()
        }).then(films => {
            if(films.results.length < 1) {
                console.log(refs.mainSection.children);
                // refs.mainSection.removeChild('h2');

                const noFilmText = createElementWithClass('h2', 'film-not-found');
                noFilmText.textContent = "Sorry, no films are found... :(";
                refs.mainSection.append(noFilmText)
            } else {films.results.forEach(film => createListItem(film))}
        })
    } else {
        api.getFilms().then(films => films.results.forEach(film => createListItem(film)))
    };
}