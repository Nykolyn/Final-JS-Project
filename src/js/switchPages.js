import {API, refs} from './constants';
import {createListItem} from './view';

const prvsBtn = document.querySelector('.prvs');
const nextBtn = document.querySelector('.next');
const buttonDiv = document.querySelector('.switchPages');

buttonDiv.addEventListener('click', switchPages)
prvsBtn.disabled = true;

let counter = 1;

function switchPages (event)  {
    refs.filmsList.innerHTML = '';
    
    if (event.target === nextBtn){
        counter++;
        prvsBtn.disabled = false;

        return fetch (`https://api.themoviedb.org/3/movie/popular?api_key=027ca1d5e779abba9fcdc8b6b57f2385&language=en-US&page=${counter}`) 
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.results.map(el => createListItem(el));
        })
        
        
    }   else if(event.target === prvsBtn ){
        counter -= 1;
        if(counter <= 1 ){
            counter = 1;
            prvsBtn.disabled = true;
        }

        return fetch (`https://api.themoviedb.org/3/movie/popular?api_key=027ca1d5e779abba9fcdc8b6b57f2385&language=en-US&page=${counter}`) 
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.results.map(el => createListItem(el));
            });

        
    }

}