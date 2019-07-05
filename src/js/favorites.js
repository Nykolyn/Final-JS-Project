import { refs } from './constants';
// import Films from './Fims/Films';
// import { films } from './app';
import { createListItem } from './view';
import { getFilms, saveFilm } from '../js/services/api';

// ID користувача
const idUser = '1111';
console.log(idUser);

// КЛИК НА КНОПКУ ДОДАТИ В МОЇ УЛЮБЛЕНІ
document.body.addEventListener('click', addFilmToServer);

// ОТРИМАННЯ ФІЛЬМІВ З МАСИВУ МОЇХ УЛЮБЛЕННИХ
const getFilmsFavorite = () => {
  return fetch(`http://localhost:3000/films`).then(response => {
    if (response.ok) return response.json();
    console.log(response);

    throw new Error('Error while fetching ' + response.statusText);
  });
};

//ВИХІД З МОЇХ ФІЛЬМІВ ДО ГОЛОВНОЇ СТОРІНКИ
function exitToFilm() {
  favorite.textContent = 'My Movies';
  refs.filmsList.innerHTML = '';
  getFilms().then(result => {
    result.results.forEach(item => createListItem(item));
  });
  favorite.removeEventListener('click', exitToFilm);
  favorite.addEventListener('click', showFavoriteFilm);
}

// // DELETE FILM
export const deleteFilm = async id => {
  const settings = {
    method: 'DELETE',
  };
  const response = await fetch(`http://localhost:3000/films/${id}`, settings);
  try {
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    throw error;
  }
};

// КНОПКА НА ГОЛОВНОМУ ЕКРАНІ МОЇ УЛУБЛЕННІ
const favorite = document.querySelector('.favorite');
favorite.addEventListener('click', showFavoriteFilm);

// favorite.textContent = 'All Movies';

// ПОКАЗАННЯ УЛЮБЛЕННИХ ФІЛЬМІВ
function showFavoriteFilm(e) {
  favorite.textContent = 'All Movies';
  refs.filmsList.innerHTML = '';
  getFilmsFavorite(idUser).then(result => {
    result.forEach(film => {
      if (film.idUser === idUser) {
        //     console.log(film.idUser);
        createListItem(film);
        console.log(film);
      } else {
        console.log('not');
      }
    });
  });

  console.log('E.TARGET', e.target);

  favorite.removeEventListener('click', showFavoriteFilm);
  favorite.addEventListener('click', exitToFilm);
}

//ДОБАВЛЕННЯ НА СЕРВЕР В МАСИВ МОЇ УЛЮБЛЕННІ
function addFilmToServer(e) {
  if (e.target.className === 'fav-button') {
    e.target.textContent = 'delete';

    // document.body.removeEventListener('click', addFilmToServer);

    const src = e.target.closest('li').children[0].children[0].children[0].src;
    const title = e.target.closest('li').children[1].textContent;
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

    saveFilm(film);
  }
}
