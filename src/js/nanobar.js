const Nanobar = require('../../node_modules/nanobar/nanobar')


const options = {
    target: document.getElementById('nanobar'),
}

const nanobar = new Nanobar(options)

const nanoBarFn = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const percentage = winScroll / height * 100;

    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        options.target.style.display = 'block'
        nanobar.go(percentage)
    } else {
        options.target.style.display = 'none'
    }
}
window.onscroll = () => {
    nanoBarFn();
}