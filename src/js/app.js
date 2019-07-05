import Films from './Fims/Films';
import { refs, commentForm, list } from './constants';
import { createListItem, commentItemCreate, commentListRender } from './view';
import './authentication/authentication';
import MicroModal from 'micromodal';
import '../sass/micromodal.scss';
import { getUserName } from './services/api';
import { isString, log } from 'util';
import { onSearch } from './search';
import './favorites';

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
}, 1000);

const films = new Films();

films.getFilms().then(result => result.forEach(item => createListItem(item)));

// timer




//modal card 
refs.filmsList.addEventListener('click', openCard);
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
    // console.log('cardStyle :', cardStyle);

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
