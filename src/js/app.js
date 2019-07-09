import Films from './Fims/Films';
import { refs, commentForm, list } from './constants';
import { createListItem, commentItemCreate, commentListRender } from './view';

import { switchPages } from './switchPages';
import './authentication/authentication';
import MicroModal from 'micromodal';
import '../sass/micromodal.scss';
import { getUser, getUserName } from './services/api';
import { isString, log } from 'util';
import { onSearch } from './search';
import './nanobar';
import './elevator';
import './sal';
import './welcomeModal';
import './timer';

const canvas = document.getElementById('c1');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('wheel', event => {
  if (event.deltaY < 0) speed *= 0.1;
  else speed *= 0.1;
  if (speed < 0.01) speed = 0.01;
  else if (speed > 0.1) speed = 0.1;
});
class Star {
  constructor() {
    this.x = Math.random() * canvas.width - canvas.width / 2;
    this.y = Math.random() * canvas.height - canvas.height / 2;
    this.px, this.py;
    this.z = Math.random() * 2;
  }
  update() {
    this.px = this.x;
    this.py = this.y;
    this.z += speed;
    this.x += this.x * (speed * 0.2) * this.z;
    this.y += this.y * (speed * 0.2) * this.z;
    if (
      this.x > canvas.width / 2 + 50 ||
      this.x < -canvas.width / 2 - 50 ||
      this.y > canvas.height / 2 + 50 ||
      this.y < -canvas.height / 2 - 50
    ) {
      this.x = Math.random() * canvas.width - canvas.width / 2;
      this.y = Math.random() * canvas.height - canvas.height / 2;
      this.px = this.x;
      this.py = this.y;
      this.z = 0;
    }
  }
  show() {
    c.lineWidth = this.z;
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineTo(this.px, this.py);
    c.stroke();
  }
}
let speed = 0.01;
let stars = [];
for (let i = 0; i < 800; i++) stars.push(new Star());
c.fillStyle = 'rgba(0, 0, 0, 0.4)';
c.strokeStyle = 'rgb(255, 255, 255)';
c.translate(canvas.width / 2, canvas.height / 2);

function draw() {
  requestAnimationFrame(draw);
  c.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  for (let s of stars) {
    s.update();
    s.show();
  }
}
draw();

// ------------  TIME  --------------------
setInterval(function() {
  const date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  document.getElementById('time').innerHTML = h + ':' + m + ':' + s;
});

// ------------  TIME  --------------------
export const films = new Films();

films.getFilms().then(result => result.forEach(item => createListItem(item)));

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
    filmListTitle.classList.add('display-none');

    window.scroll(0, 50);

    //toggle event click
    refs.filmsList.removeEventListener('click', openCard);
    refs.filmsList.addEventListener('click', closedCard);

    function closedCard(event) {
      if (
        event.target === exitButton ||
        event.target === image ||
        event.target === list ||
        event.target.nodeName === 'IMG'
      ) {
        targetCard.classList.remove('modal-card');
        targetDiv.classList.remove('card-block');
        imageWrap.classList.remove('image-wrap_markup');
        image.classList.remove('img-markup');
        filmListTitle.classList.remove('display-none');

        window.scroll(clientX, clientY);

        //toggle event click
        refs.filmsList.removeEventListener('click', closedCard);
        refs.filmsList.addEventListener('click', openCard);
      }
    }
  }
}
// }

let filmId = null;
let commentToPost = null;

const handleComment = event => {
  if (event.target.closest('li').nodeName !== 'LI') return;
  const parentItem = event.target.closest('li');
  const id = parentItem.id;
  const commentsList = parentItem.querySelector('.comments-list');
  commentsList.classList.add('scroll');
  if (event.target.nodeName === 'IMG') {
    commentsList.innerHTML = '';
    films.getComments().then(comments => {
      comments
        .sort((a, b) => b.id - a.id)
        .map(comment => {
          if (comment.filmId === id) {
            commentsList.innerHTML += commentItemCreate(
              comment.name,
              comment.comment,
              comment.date,
            );
          }
        });
    });
  }

  if (event.target.className === 'refresh-comments-button') {
    commentsList.innerHTML = '';
    films.getComments().then(comments => {
      comments
        .sort((a, b) => b.id - a.id)
        .map(comment => {
          if (comment.filmId === id) {
            commentsList.innerHTML += commentItemCreate(
              comment.name,
              comment.comment,
              comment.date,
            );
          }
        });
    });
  }

  event.target.closest('li') === parentItem ? (filmId = parentItem.id) : null;
  if (event.target.className === 'comments-button') {
    MicroModal.show('modal-1');
  }
};

const handleCommentSubmit = event => {
  event.preventDefault();
  const [comment] = event.currentTarget.elements;

  if (comment.value.trim() === '') return console.log('Заполни все поля!');
  commentToPost = comment.value;
  const id = sessionStorage.getItem('id');

  getUserName(id).then(user => {
    const newComment = {
      filmId: filmId,
      name: user.login,
      comment: commentToPost,
      date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    };

    films.updateComment(newComment);

    const commentsList = document.querySelector(`li[id="${filmId}"] .comments-list`);
    commentsList.insertAdjacentHTML(
      'afterbegin',
      commentItemCreate(newComment.name, newComment.comment, newComment.date),
    );
    MicroModal.close('modal-1');
  });
  event.currentTarget.reset();
};

const cardRotation = event => {
  // if (event.target.closest('li').nodeName !== 'LI') return
  // const card = event.target.closest('li');
  if (event.target.nodeName !== 'IMG') return;
  const card = event.target;

  const startRotate = event => {
    const halfHieight = card.offsetHeight / 2;
    const halfWidth = card.offsetWidth / 2;
    card.style.transform =
      'rotateX(' +
      -(event.offsetY - halfHieight) / 8 +
      'deg) rotateY(' +
      (event.offsetX - halfWidth) / 8 +
      'deg)';
  };

  const stopRotate = event => {
    card.style.transform = 'rotate(0)';
  };

  card.addEventListener('mousemove', startRotate);
  card.addEventListener('mouseout', stopRotate);
};

refs.filmsList.addEventListener('click', openCard);
refs.mainSection.addEventListener('click', handleComment);
refs.searchForm.addEventListener('submit', onSearch);
commentForm.addEventListener('submit', handleCommentSubmit);
// refs.filmsList.addEventListener('mouseover', cardRotation)
