import {
  handleFavBtnClick
} from './favorites';
export const createElementWithClass = (tag, classTitle) => {
  const elementToCreate = document.createElement(tag);
  elementToCreate.classList.add(classTitle);
  return elementToCreate;
};

const setIdToElem = (elem, id) => {
  elem.setAttribute('id', id);
};

export const createListItem = (film, content) => {
  const filmsList = document.querySelector('.films-list');

  const liToCreate = createElementWithClass('li', 'films-list__item');
  setIdToElem(liToCreate, film.id);
  const poster = createElementWithClass('img', 'films_list__poster');
  const filmTitle = createElementWithClass('p', 'film-list__title');

  //modal card
  const exitButton = createElementWithClass('button', 'exit-button');
  // exitButton.textContent = 'exit button'  //comm for test
  const cardInner = createElementWithClass('div', 'card-inner');
  const cardWrap = createElementWithClass('div', 'card-wrap');
  const favButton = createElementWithClass('button', 'fav-button');
  favButton.textContent = content ? 'delete' : 'my movies';
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
  commButton.textContent = 'Add comment';

  const buttonsWrapp = createElementWithClass('div', 'buttons-wrap');
  poster.setAttribute('src', `https://image.tmdb.org/t/p/w500/${film.poster_path}`);
  filmTitle.textContent = film.title;

  //append DOM
  titleWrap.append(cardTitle, release, voteCount, voteAverage, overviewFils);
  commWrap.append(commList);

  // button wrapper

  buttonsWrapp.append(favButton, commButton);

  cardWrap.append(exitButton, titleWrap, commWrap, buttonsWrapp);

  imageWrap.appendChild(poster);

  cardInner.append(imageWrap, cardWrap); //left/right block

  liToCreate.append(cardInner, filmTitle);
  filmsList.appendChild(liToCreate);

  favButton.addEventListener('click', handleFavBtnClick);
};

export const commentItemCreate = (name, comment, date) => {
  return `<li class="comments-item">
                <p class="comments-name"><span class="comments-span_name">Name: </span>${name}</p>
                <p class="comments-comment">${comment}</p>
                <p class="comments-date"><span class="comments-span_name">When: </span>${date}</p>
            </li>`;
};

export const commentListRender = (link, arr, id) => {
  const render = arr.reduce((acc, cur) => {
    if (cur.filmId === id) {
      return acc + commentItemCreate(cur.name, cur.comment, cur.date);
    }
  }, '');
  console.log(render);

  return (link.innerHTML = render);
};