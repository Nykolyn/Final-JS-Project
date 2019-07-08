export const API = 'https://api.themoviedb.org/3/movie/popular?api_key=027ca1d5e779abba9fcdc8b6b57f2385&language=en-US&page=1';

export const refs = {
    mainSection: document.querySelector('.main-section'),
    filmsList: document.querySelector('.films-list'),
    searchForm: document.querySelector('.search')
}

export const commentForm = document.querySelector('.comment-form');

export const addingEventListener = (myConst, type, listener) => myConst.addEventListener(type, listener);