import { refs } from './constants';
import { createListItem, createElementWithClass } from './view';
import { getFilms, saveFilm } from '../js/services/api';
import { getFilmsFavorite, deleteFilm } from './services/api';
import Swal from 'sweetalert2';
import { films } from './app';
const personalIdUser = sessionStorage.getItem('id');
// console.log('id', personalIdUser);
const idUser = personalIdUser;

// ДОДАЄМО В МОЇ УЛЮБЛЕНІ
export const handleFavBtnClick = ({
  target = {
    textContent,
  },
}) => {
  if (target.textContent === 'my movies') {
    const release = target.closest('li').children[0].children[1].children[1].children[1]
      .textContent;

    const count = target.closest('li').children[0].children[1].children[1].children[2].textContent;

    const average = target.closest('li').children[0].children[1].children[1].children[3]
      .textContent;

    const overview = target.closest('li').children[0].children[1].children[1].children[4]
      .textContent;
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
      release_date: release,
      vote_count: count,
      vote_average: average,
      overview: overview,
      idUser: idUser,
    };

    getFilmsFavorite(idUser).then(result => {
      const resultSearch = result.some(film => film.title === title && film.idUser === idUser);
      if (!resultSearch) {
        saveFilm(film);

        Swal.fire({
          position: 'center-center',
          type: 'success',
          title: 'ADDED TO MY MOVIES',
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          position: 'center-center',
          type: 'info',
          title: 'MOVIE ADDED',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  } else {
    let titleDelete = target.closest('li').children[1].textContent;

    getFilmsFavorite(idUser)
      .then(result => {
        let deleteObj = result.find(film => film.title === titleDelete);
        deleteFilm(deleteObj.id);
        Swal.fire({
          position: 'center-center',
          type: 'success',
          title: 'REMOVED FROM MY MOVIES',
          showConfirmButton: false,
          timer: 1000,
        });
        return result.filter(el => el.id !== deleteObj.id);
      })
      .then(data => {
        refs.filmsList.innerHTML = '';

        data.forEach(film => film.idUser === idUser && createListItem(film, true));
      });
  }
};

function exitToFilm() {
  refs.searchForm.classList.remove('delete-form');
  favorite.textContent = 'My Movies';
  refs.filmsList.innerHTML = '';
  getFilms().then(result => {
    result.results.forEach(item => createListItem(item));
  });
  favorite.removeEventListener('click', exitToFilm);
  favorite.addEventListener('click', showFavoriteFilm);
}

const favorite = document.querySelector('.favorite');
favorite.addEventListener('click', showFavoriteFilm);

function showFavoriteFilm(e) {
  if (e.target.closest('body').querySelector('.main-section .outer-div')) {
    e.target.closest('body').querySelector('.main-section .outer-div').style.height = '10px';
    e.target.closest('body').querySelector('.main-section .outer-div').innerHTML = '';
  }

  // if (e.target.closest('body').querySelector('.main-section .films_list__poster')) {
  //   commentsList.innerHTML = '';
  //   films.getComments().then(comments => {
  //     comments
  //       .sort((a, b) => b.id - a.id)
  //       .map(comment => {
  //         if (comment.filmId === id) {
  //           commentsList.innerHTML += commentItemCreate(
  //             comment.name,
  //             comment.comment,
  //             comment.date,
  //           );
  //         }
  //       });
  //   });
  // }

  refs.searchForm.classList.add('delete-form');
  favorite.textContent = 'All Movies';
  // refs.mainSection.innerHTML = '';
  const arr = []
  refs.filmsList.innerHTML = '';
  films.getFilms().then(result => {
    result.map(el => {

      return getFilmsFavorite(idUser).then(films => {
        films.map(film => {
          if (film.idUser === idUser) {
            arr.push(film)
          }

          if (film.idUser === idUser) {
            const filmsList = document.querySelector('.films-list');

            const liToCreate = createElementWithClass('li', 'films-list__item');
            liToCreate.setAttribute('id', el.id);
            const poster = createElementWithClass('img', 'films_list__poster');
            const filmTitle = createElementWithClass('p', 'film-list__title');

            //modal card
            const exitButton = createElementWithClass('button', 'exit-button');
            // exitButton.textContent = 'exit button'  //comm for test
            const cardInner = createElementWithClass('div', 'card-inner');
            const cardWrap = createElementWithClass('div', 'card-wrap');
            const favButton = createElementWithClass('button', 'fav-button');
            favButton.textContent = 'delete';
            const titleWrap = createElementWithClass('div', 'title-wrap');
            const cardTitle = createElementWithClass('p', 'film-card_title');
            cardTitle.textContent = film.title;
            const release = createElementWithClass('p', 'film-release');
            release.textContent = `Release - ${film.release_date}`;
            const voteCount = createElementWithClass('p', 'film-vote_count');
            voteCount.textContent = `Vote count - ${film.vote_count}`;
            const voteAverage = createElementWithClass('p', 'film-vote_average');
            voteAverage.textContent = `Vote average - ${film.vote_average}`;
            const overviewFils = createElementWithClass('p', 'overview-film');
            overviewFils.textContent = film.overview;

            const imageWrap = createElementWithClass('div', 'image-wrap');

            //modal for comments
            const commWrap = createElementWithClass('div', 'comments-wrap');
            const commList = createElementWithClass('ul', 'comments-list');
            const commButton = createElementWithClass('button', 'comments-button');
            const commRefresh = createElementWithClass('button', 'refresh-comments-button');
            commButton.textContent = 'Add comment';
            commRefresh.textContent = 'Refresh comments';

            const buttonsWrapp = createElementWithClass('div', 'buttons-wrap');
            poster.setAttribute('src', `https://image.tmdb.org/t/p/w500/${film.poster_path}`);
            filmTitle.textContent = film.title;

            //append DOM
            titleWrap.append(cardTitle, release, voteCount, voteAverage, overviewFils);
            commWrap.append(commList);

            // button wrapper

            buttonsWrapp.append(favButton, commButton, commRefresh);

            cardWrap.append(exitButton, titleWrap, commWrap, buttonsWrapp);

            imageWrap.appendChild(poster);

            cardInner.append(imageWrap, cardWrap); //left/right block

            liToCreate.append(cardInner, filmTitle);
            filmsList.appendChild(liToCreate);

            favButton.addEventListener('click', handleFavBtnClick);
          }
        });

        const unique = Array.from(new Set (arr.map(s => s.id)))
        .map(id => {
          return {
            poster_path: arr.find(s => s.id === id).poster_path,
            title: arr.find(s => s.id === id).title,
            release_date: arr.find(s => s.id === id).prelease_date,
            vote_count: arr.find(s => s.id === id).vote_count,
            vote_average: arr.find(s => s.id === id).vote_average,
            overview: arr.find(s => s.id === id).overview,

          }
        })
        console.log(unique.length)
        return unique
      });
    });
  })
  getFilmsFavorite(idUser).then(result => {
    result.forEach(film => {
      films.getFilms().then(result => result.forEach(el => {}));

      // console.log(film);
      // console.log(film.title);
      // film.idUser === idUser ? createListItem(film, true) : null;
    });
  });

  favorite.removeEventListener('click', showFavoriteFilm);
  favorite.addEventListener('click', exitToFilm);
}

getFilms().then(console.log)