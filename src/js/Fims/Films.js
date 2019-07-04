import * as api from '../services/api'

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
        return api.getComments()
            .then(user => user.map(user => user.comments))
            .then(comments => this._comments = comments)
    }

    updateComment(id, comment) {
        return api.commentFilm(id, comment).then()
    }
}