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
    poster.setAttribute('src', `https://image.tmdb.org/t/p/w500/${film.poster_path}`);
    filmTitle.textContent = film.title;

    liToCreate.append(poster, filmTitle);
    filmsList.appendChild(liToCreate);
}