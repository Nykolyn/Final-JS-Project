import Films from './Fims/Films';
import {
    refs
} from './constants';
import {
    getFilms
} from './services/api';
import {
    createListItem
} from './view';

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

// timer




//modal card 
refs.filmsList.addEventListener('click', openCard);

// function openCard(event) {
//     const targetCard = event.target.closest('li');
//     const targetDiv = targetCard.querySelector('.card-wrap');

//     targetCard.classList.toggle('modal-card');
//     targetDiv.classList.toggle('card-block');
// }

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

    console.log(event);
    // console.log('pageYOffset', pageYOffset);   
    // console.log(event.layerY);
    // console.log(event.offsetY);
    // console.log(screenY);
    // console.log('pageY :', event.pageY);
    // console.log(event.y);
    // console.log(event.target);
    // console.log(targetCard.style);
}