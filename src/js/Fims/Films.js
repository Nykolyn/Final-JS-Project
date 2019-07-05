import * as api from '../services/api';

export default class Films {
    constructor(films = []) {
        this._films = films
    }

    get films() {
        return this._films;
    }

    getFilms() {
        return api.getFilms().then(films => this._films = films.results)
    }

    updateComment(id, comment) {
        return api.commentFilm(id, comment).then()
    }

    searchFilm() {
        return api.getFilms().then(films => {
                 if(value !== ''){
                    films.forEach(elen =>{
                    if (elen.textContent.search(value) == -1){
                        elen.classList.add('hide')
                    }else {
                        elen.class.remove('hide')
                    }
                    })
                        
                }else {
                    films.forEach(elem => elem.classList.remove('hide'))
        }
    
        })

       
    }


    // }
    // if(value !== ''){
    //     list.forEach(elen =>{
    //     if (elen.textContent.search(value) == -1){
    //         elen.classList.add('hide')
    //     }else {
    //         elen.class.remove('hide')
    //     }
    //     })
            
    // }else {
    //     list.forEach(elem => elem.classList.remove('hide'))
    // }



    }