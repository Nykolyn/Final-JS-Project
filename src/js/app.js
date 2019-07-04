import {getFilms} from './services/api';
import {createListItem} from './view';
const films = getFilms().then(result => result.results.forEach(item => createListItem(item)));


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



import {
    createListItem
} from "./view";
import Films from './Fims/Films';
import {refs} from './constants';

const films = new Films();

films.getFilms().then(result =>
    result.forEach(item => createListItem(item))
);

// timer
