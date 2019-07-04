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
    const exitButton = createElementWithClass('button', 'exit-button')
    // exitButton.textContent = 'exit button'  //comm for test
    const cardInner = createElementWithClass('div', 'card-inner');
    const cardWrap = createElementWithClass('div', 'card-wrap');    
    const favButton = createElementWithClass('button', 'fav-button');
    favButton.textContent = 'fav button'
    const titleWrap = createElementWithClass('div', 'title-wrap');
    const cardTitle = createElementWithClass('p', 'film-card_title');
    cardTitle.textContent = film.title;
    const release = createElementWithClass('p', 'film-release');
    release.textContent = `Release - ${film.release_date}`;
    const voteCount = createElementWithClass('p', 'film-vote_count');
    voteCount.textContent = `Vote count - ${film.vote_count}`;
    const voteAverage = createElementWithClass('p', 'film-vote_average');
    voteAverage.textContent = `Vote average - ${film.vote_average}`;
    const imageWrap = createElementWithClass('div', 'image-wrap');

    
    
    
    //modal for comments
    const commWrap = createElementWithClass('div', 'comments-wrap');
    const commList = createElementWithClass('ul', 'comments-list');
    const commButton = createElementWithClass('button', 'comments-button')
    commButton.textContent = 'Comments';
    
    poster.setAttribute('src', `https://image.tmdb.org/t/p/w500/${film.poster_path}`);
    filmTitle.textContent = film.title;
    
    //=====like-dis===//
    const cardBtn = createElementWithClass('div','click')
    const like = createElementWithClass('button','button-like');
    like.textContent = 'LIKE';
    const dislike = createElementWithClass('button','button-dislike');
    dislike.textContent = 'DISLIKE'
    
    cardWrap.append(cardBtn);
    cardBtn.append(like,dislike);
    
    //append DOM 
    titleWrap.append(cardTitle, release, voteCount, voteAverage,);
    commWrap.append(commButton, commList)
    
    cardWrap.append(exitButton,titleWrap, commWrap, favButton);
    
    imageWrap.appendChild(poster)
    
    cardInner.append(imageWrap, cardWrap); //left/right block
    
    liToCreate.append(cardInner, filmTitle);
    filmsList.appendChild(liToCreate);
    
}