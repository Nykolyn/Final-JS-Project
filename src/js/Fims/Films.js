import * as api from "../services/api";
import { refs } from "../constants";

export default class Films {
  constructor(films = [], comments = []) {
    (this._films = films), (this._comments = comments);
  }

  get films() {
    return this._films;
  }

  getFilms() {
    return api.getFilms().then(films => (this._films = films.results));
  }

  getComments() {
    return api.getComments().then(comments => (this._comments = comments));
  }

  updateComment(comment) {
    return api.commentFilm(comment);
  }
}
