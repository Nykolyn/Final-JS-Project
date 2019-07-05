import * as api from '../services/api';

export default class Films {
  constructor(films = []) {
    this._films = films;
  }

  get films() {
    return this._films;
  }

  getFilms() {
    return api.getFilms().then(films => (this._films = films.results));
  }

  updateComment(id, comment) {
    return api.commentFilm(id, comment).then();
  }
}
