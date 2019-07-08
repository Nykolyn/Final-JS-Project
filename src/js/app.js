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
    getUser,
    getUserName
} from './services/api'
import {
    isString,
    log
} from 'util';
import {
    onSearch
} from './search';
import './nanobar';
import './elevator';

import Swal from 'sweetalert2';


const open = document.getElementById('submit-signin')
console.log(open);


const handleModal = event => {
    Swal.fire({
        title: 'Welcome!',
        text: 'In your collection',
        width: 600,
        // animation: false,
        showConfirmButton: false,
        customClass: 'animated bounce',
        // timer: 1500,
        type: 'success',
        padding: '10em',
        // background: '#fff url("http://www.coolwebmasters.com/uploads/posts/2010-10/1287573191_patterns-42.jpg")',
        backdrop: `
        rgba(0,0,123,0.4)
        url("https://i.gifer.com/PYh.gif")
        center left
        no-repeat
        `,
        

    });
};



open.addEventListener('click', handleModal)


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

export const films = new Films();

films.getFilms().then(result =>
    result.forEach(item => createListItem(item))
);

function openCard(event) {

    const list = document.querySelector('.container');
    const body = document.querySelector('body');


    const targetCard = event.target.closest('li');
    const targetDiv = targetCard.querySelector('.card-wrap');
    const exitButton = targetCard.querySelector('.exit-button');
    const imageWrap = targetCard.querySelector('.image-wrap');
    const image = targetCard.querySelector('img');

    const filmListTitle = targetCard.querySelector('.film-list__title');


    const cardStyle = window.getComputedStyle(targetCard);


    // mouse cord
    const clientX = event.layerX;
    const clientY = event.layerY;

    if (!targetCard.className.includes('modal-card')) {
        targetCard.classList.add('modal-card');
        targetDiv.classList.add('card-block');
        // imageWrap.classList.add('image-wrap_markup')  //test
        image.classList.add('img-markup');
        filmListTitle.classList.add('display-none')

        window.scroll(0, 100);

        //toggle event click 
        refs.filmsList.removeEventListener('click', openCard);
        refs.filmsList.addEventListener('click', closedCard);

        function closedCard(event) {


            if (event.target === exitButton || event.target === image || event.target === list || event.target.nodeName === 'IMG') {
                targetCard.classList.remove('modal-card')
                targetDiv.classList.remove('card-block');
                imageWrap.classList.remove('image-wrap_markup')
                image.classList.remove('img-markup');
                filmListTitle.classList.remove('display-none')

                window.scroll(clientX, clientY);

                //toggle event click 
                refs.filmsList.removeEventListener('click', closedCard);
                refs.filmsList.addEventListener('click', openCard);
            }
        }
    }
}



let filmId = null;
let commentToPost = null;
const commentItem = {};

const handleComment = event => {
    if (event.target.closest('li').nodeName !== 'LI') return
    const parentItem = event.target.closest('li');
    const id = parentItem.id;
    const commentsList = parentItem.querySelector('.comments-list');
    commentsList.classList.add('scroll')
    if (event.target.nodeName === 'IMG') {
        commentsList.innerHTML = '';
        films.getComments().then(comments => {
            comments.sort((a, b) => b.id - a.id)
                .map(comment => {
                    if (comment.filmId === id) {
                        commentsList.innerHTML += commentItemCreate(comment.name, comment.comment, comment.date)
                    }
                })
        })
    }

    if (event.target.className === 'refresh-comments-button') {
        commentsList.innerHTML = '';
        films.getComments().then(comments => {
            comments.sort((a, b) => b.id - a.id)
                .map(comment => {
                    if (comment.filmId === id) {
                        commentsList.innerHTML += commentItemCreate(comment.name, comment.comment, comment.date)
                    }
                })
        })
    }

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
    const id = sessionStorage.getItem('id') === null ? localStorage.getItem('key') : sessionStorage.getItem('id')

    getUserName(id).then(user => {
        const newComment = {
            filmId: filmId,
            name: user.login,
            comment: commentToPost,
            date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        }


        films.updateComment(newComment)
        commentItem.name = newComment.name;
        commentItem.comment = newComment.comment;
        commentItem.date = newComment.date;
        MicroModal.close('modal-1');
    })
    event.currentTarget.reset();
}

const cardRotation = event => {
    // if (event.target.closest('li').nodeName !== 'LI') return
    // const card = event.target.closest('li');
    if (event.target.nodeName !== 'IMG') return
    const card = event.target;

    const startRotate = event => {
        const halfHieight = card.offsetHeight / 2;
        const halfWidth = card.offsetWidth / 2;
        card.style.transform = 'rotateX(' + -(event.offsetY - halfHieight) / 8 + 'deg) rotateY(' + (event.offsetX - halfWidth) / 8 + 'deg)';
    }

    const stopRotate = event => {
        card.style.transform = 'rotate(0)';
    }

    card.addEventListener('mousemove', startRotate);
    card.addEventListener('mouseout', stopRotate);
}

refs.filmsList.addEventListener('click', openCard);
refs.filmsList.addEventListener('click', handleComment);
commentForm.addEventListener('submit', handleCommentSubmit);
// refs.filmsList.addEventListener('mouseover', cardRotation)
// refs.searchForm.addEventListener('input', onSearch)