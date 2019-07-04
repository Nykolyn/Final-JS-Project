import * as api from '../services/api';
import {
    refs
} from '../constants';


export default class Films {
    constructor(films = [], comments = []) {
        this._films = films,
            this._comments = comments;
    }

    get films() {
        return this._films;
    }

    getFilms() {
        return api.getFilms().then(films => this._films = films.results)
    }

    getComments() {
        return api.getComments().then(comments => this._comments = comments);
    }

    updateComment(comment) {
        return api.commentFilm(comment).then(console.log)
    }

    // searchFilm(value) {
    //     // return api.getFilms().then(films => {

    //     if (value !== '') {
    //         fetch(`https://api.themoviedb.org/3/search/movie/popular?api_key=027ca1d5e779abba9fcdc8b6b57f2385&language=en-US&query=${value}`).then(response => {
    //             if (response.ok) return response.json()
    //         }).then(films => {
    //             console.log(films);
    //             // const films = document.querySelectorAll('.films-list__item')
    //             // films.forEach(elem => {
    //             //     if (!elem.textContent.toLowerCase().includes(value.toLowerCase())) {
    //             //         elem.classList.add('hide')
    //             //     } else {
    //             //         elem.classList.remove('hide')
    //             //     }
    //             // })
    //         })
    //     } else {
    //         films.forEach(elem => elem.classList.remove('hide'))
    //     }
    // }

    // })
}