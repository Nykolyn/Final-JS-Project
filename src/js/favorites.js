import { refs } from './constants';
import { createListItem } from './view';
import { getFilms, saveFilm } from '../js/services/api';
import { getFilmsFavorite, deleteFilm } from './services/api';

const personalIdUser = sessionStorage.getItem('id');
console.log(personalIdUser);
const idUser = personalIdUser;

// ДОДАЄМО В МОЇ УЛЮБЛЕНІ
export const handleFavBtnClick = ({ target = { textContent } }) => {
  if (target.textContent === 'my movies') {
    const src = target.closest('li').children[0].children[0].children[0].src;
    const title = target.closest('li').children[1].textContent;
    let result;
    for (let i = src.length; i > 0; i--) {
      if (src[i] === '/') {
        result = src.substr(src.length - i + 1);
        break;
      }
    }
    const film = {
      poster_path: result,
      title: title,
      idUser: idUser,
    };
    // ПЕРЕВІРКА НА НАЯВНІСТЬ ФІЛЬМА В МАСИВІ
    getFilmsFavorite(idUser).then(result => {
      const resultSearch = result.some(film => film.title === title);
      !resultSearch ? saveFilm(film) : null;
    });
  } else {
    let titleDelete = target.closest('li').children[1].textContent;

    getFilmsFavorite(idUser)
      .then(result => {
        let deleteObj = result.find(film => film.title === titleDelete);
        deleteFilm(deleteObj.id);
        return result.filter(el => el.id !== deleteObj.id);
      })
      .then(data => {
        refs.filmsList.innerHTML = '';

        data.forEach(film => film.idUser === idUser && createListItem(film, true));
      });
  }
};

//ВИХІД НА ГОЛОВНУ СТОРІНКУ
function exitToFilm() {
  favorite.textContent = 'My Movies';
  refs.filmsList.innerHTML = '';
  getFilms().then(result => {
    result.results.forEach(item => createListItem(item));
  });
  favorite.removeEventListener('click', exitToFilm);
  favorite.addEventListener('click', showFavoriteFilm);
}

// КНОПКА НА ГОЛОВНОМУ ЕКРАНІ МОЇ УЛУБЛЕННІ
const favorite = document.querySelector('.favorite');
favorite.addEventListener('click', showFavoriteFilm);

// ПОКАЗАННЯ УЛЮБЛЕННИХ ФІЛЬМІВ
function showFavoriteFilm(e) {
  favorite.textContent = 'All Movies';
  refs.filmsList.innerHTML = '';
  getFilmsFavorite(idUser).then(result => {
    result.forEach(film => {
      film.idUser === idUser ? createListItem(film, true) : null;
    });
  });

  favorite.removeEventListener('click', showFavoriteFilm);
  favorite.addEventListener('click', exitToFilm);
}
