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

    //modal card
    const cardWrap = createElementWithClass('div', 'card-wrap');    
    const favButton = createElementWithClass('button', 'fav-button');
    const release = createElementWithClass('p', 'film-release');
    release.textContent = film.release;
    const voteCount = createElementWithClass('p', 'film-vote_count');
    voteCount.textContent = film.vote_count;
    const voteAverage = createElementWithClass('p', 'film-vote_average');
    voteAverage.textContent = film.text_content;
    
    poster.setAttribute('src', `https://image.tmdb.org/t/p/w500/${film.poster_path}`);
    filmTitle.textContent = film.title;

    cardWrap.append(release, voteCount, voteAverage, favButton); //modal-card

    liToCreate.append(poster, filmTitle, cardWrap);
    filmsList.appendChild(liToCreate);

}