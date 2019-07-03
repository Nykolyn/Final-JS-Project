const createElementWithClass = (tag, classTitle) => {
    const elementToCreate = document.createElement(tag);
    elementToCreate.classList.add(classTitle);
    return elementToCreate;
};

export const createListItem = (film) => {
    const filmsList = document.querySelector('.films-list');
    
    const liToCreate = createElementWithClass('li', 'films-list__item');
    const poster = createElementWithClass('img', 'films_list__poster');
    const filmTitle = createElementWithClass('p', 'film-list__title');


    console.log('film :', film);

    //modal card
    const exitButton = createElementWithClass('button', 'exit-button')
    exitButton.textContent = 'exit button'
    const cardInner = createElementWithClass('div', 'card-inner');
    const cardWrap = createElementWithClass('div', 'card-wrap');    
    const favButton = createElementWithClass('button', 'fav-button');
    favButton.textContent = 'fav button'
    const cardTitle = createElementWithClass('p', 'film-card_title')
    cardTitle.textContent = `${film.title}`;
    const release = createElementWithClass('p', 'film-release');
    release.textContent = `Release - ${film.release_date}`;
    const voteCount = createElementWithClass('p', 'film-vote_count');
    voteCount.textContent = `Vote count - ${film.vote_count}`;
    const voteAverage = createElementWithClass('p', 'film-vote_average');
    voteAverage.textContent = `Vote average - ${film.vote_average}`;
    const imageWrap = createElementWithClass('div', 'image-wrap');


    
    poster.setAttribute('src', `https://image.tmdb.org/t/p/w500/${film.poster_path}`);
    filmTitle.textContent = film.title;

    cardWrap.append(exitButton,release, voteCount, voteAverage, favButton); //modal-card
    imageWrap.appendChild(poster)
    cardInner.append(imageWrap, cardWrap);

    liToCreate.append(cardInner, filmTitle);
    filmsList.appendChild(liToCreate);

}