import Films from './Fims/Films';
import {
    refs,
    commentForm,
    list,
} from './constants';
import {
    createListItem,
    commentItemCreate,
    commentListRender,
} from './view';
import './authentication/authentication';
import MicroModal from 'micromodal';
import '../sass/micromodal.scss';
import {
    getUserName
} from './services/api'

// ------------  TIME  -------------------- 
setInterval(function () {
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;
    s = (s < 10) ? '0' + s : s;
    document.getElementById('time').innerHTML = h + ':' + m + ':' + s;
}, 1000);

const films = new Films();

films.getFilms().then(result =>
    result.forEach(item => createListItem(item))
);

function openCard(event) {

    const targetCard = event.target.closest('li');
    const targetDiv = targetCard.querySelector('.card-wrap');
    const exitButton = targetCard.querySelector('.exit-button');
    const imageWrap = targetCard.querySelector('.image-wrap');
    const image = targetCard.querySelector('img');

    const cardStyle = window.getComputedStyle(targetCard);
    // console.log('cardStyle :', cardStyle);

    // mouse cord
    const clientX = event.layerX;
    const clientY = event.layerY;

    if (!targetCard.className.includes('modal-card')) {
        targetCard.classList.add('modal-card');
        targetDiv.classList.add('card-block');
        // imageWrap.classList.add('image-wrap_markup')  //test
        image.classList.add('img-markup');

        window.scroll(0, 100);

        //toggle event click 
        refs.filmsList.removeEventListener('click', openCard);
        refs.filmsList.addEventListener('click', closedCard);

        function closedCard(event) {
            if (event.target === exitButton) {
                targetCard.classList.remove('modal-card')
                targetDiv.classList.remove('card-block');
                imageWrap.classList.remove('image-wrap_markup')
                image.classList.remove('img-markup');

                window.scroll(clientX, clientY);

                //toggle event click 
                refs.filmsList.removeEventListener('click', closedCard);
                refs.filmsList.addEventListener('click', openCard);
            }
        }
    }
}



let filmId = null;
let commentUserName = null;
let commentToPost = null;

const handleComment = event => {
    // const commentsArr = [];
    // films.getComments().then(comments => {
    //     comments.map(comment => commentsArr.push(comment));
    // });
    // if (event.target.closest('li').nodeName !== 'li') return
    if (event.target.closest('li').nodeName !== 'LI') return
    console.log(event.target)
    const parentItem = event.target.closest('li');
    // if (event.target.closest('li') !== parentItem) return
    const id = parentItem.id;
    const commentsList = parentItem.querySelector('.comments-list');
    commentsList.innerHTML = '';
    commentsList.style.overflow = 'scroll';


    films.getComments().then(comments => {
        comments.map(comment => {
            if (comment.filmId === id) {
                commentsList.innerHTML += commentItemCreate(comment.name, comment.comment, comment.date);
            }
        })
    })

    event.target.closest('li') === parentItem ? filmId = parentItem.id : null;
    if (event.target.className === 'comments-button') {
        MicroModal.show('modal-1')
    }
}

const handleCommentSubmit = event => {
    event.preventDefault();
    const [comment] = event.currentTarget.elements;

    if (comment.value.trim() === '') return console.log('Заполни все поля!');
    commentToPost = comment.value;
    getUserName(localStorage.getItem('key')).then(user => {
        const newComment = {
            filmId: filmId,
            name: user.login,
            comment: commentToPost,
            date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        }

        films.updateComment(newComment)
        MicroModal.close('modal-1')
    })
    event.currentTarget.reset();

}


refs.filmsList.addEventListener('click', openCard);
refs.filmsList.addEventListener('click', handleComment);
commentForm.addEventListener('submit', handleCommentSubmit)