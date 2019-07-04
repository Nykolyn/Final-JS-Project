import Films from './Fims/Films';
import {
    refs
} from './constants';
import {
    createListItem
} from './view';
import './authentication/authentication';
import MicroModal from 'micromodal';
import '../sass/micromodal.scss';

document.body.addEventListener('click', event => {
    MicroModal.show('modal-1')
    setTimeout(() => {
        MicroModal.close('modal-1')
    }, 2000)
})

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

// console.log(refs.filmsList);



function openCard(event) {

    const targetCard = event.target.closest('li');
    const targetDiv = targetCard.querySelector('.card-wrap');
    const exitButton = targetCard.querySelector('.exit-button');

    const cardStyle = window.getComputedStyle(targetCard);
    // console.log('cardStyle :', cardStyle);

    // mouse cord
    const clientX = event.layerX;
    const clientY = event.layerY;

    if (!targetCard.className.includes('modal-card')) {
        targetCard.classList.add('modal-card');
        targetDiv.classList.add('card-block');

        window.scroll(0, 100);

        //toggle event click 
        refs.filmsList.removeEventListener('click', openCard);
        refs.filmsList.addEventListener('click', closedCard);

        function closedCard(event) {
            if (event.target === exitButton) {
                targetCard.classList.remove('modal-card')
                targetDiv.classList.remove('card-block');

                window.scroll(clientX, clientY);

                //toggle event click 
                refs.filmsList.removeEventListener('click', closedCard);
                refs.filmsList.addEventListener('click', openCard);
            }
        }
    }

    // console.log(event);
    // console.log('pageYOffset', pageYOffset);   
    // console.log(event.layerY);
    // console.log(event.offsetY);
    // console.log(screenY);
    // console.log('pageY :', event.pageY);
    // console.log(event.y);
    // console.log(event.target);
    // console.log(targetCard.style);
}

const handleComment = event => {
    console.log(event.target)
    const parentItem = event.target.closest('li');
    const id = parentItem.id;
    // console.log(parentItem)
    // console.log(id)
    // films.updateComment(id, {
    //     id: id,
    //     comment: 'asdasdas'
    // })
}

refs.filmsList.addEventListener('click', openCard);
refs.filmsList.addEventListener('click', handleComment)