export const searchForm = (evt) => {
    const list = document.querySelectorAll('.list-item')
    const value = evt.target.value.trim()
    console.log(evt)
    
    
    if(value !== ''){
        list.forEach(elen =>{
        if (elen.textContent.search(value) == -1){
            elen.classList.add('hide')
        }else {
            elen.class.remove('hide')
        }
        })
            
    }else {
        list.forEach(elem => elem.classList.remove('hide'))
    }
}
// search.addEventListener('input',searchForm)