export const API = 'https://api.themoviedb.org/3/movie/popular?api_key=027ca1d5e779abba9fcdc8b6b57f2385&language=en-US&page=1';

export const refs = {
    filmsList: document.querySelector('.films-list'),
    commentsList: document.querySelector('.comments-list')
}

export const list = () => {
    return refs.commentsList
}

export const commentForm = document.querySelector('.comment-form');