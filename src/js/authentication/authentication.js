import {
    postUser,
    getUser
} from '../services/api'

const forms = document.querySelectorAll('form');
const formSingIn = forms[0];
const formSingUp = forms[1];
const LogedIn = () => {
    document.querySelector('.cd-signin-modal').classList.remove('cd-signin-modal--is-visible')
    document.querySelector('.films-list').style.filter = "blur(0px)"
    document.querySelector('.films-list').style.transition = "1000ms"
    const buttons = document.querySelectorAll('.cd-main-nav__item')
    buttons[0].textContent = 'My Movies'
    buttons[1].style.backgroundColor = 'red'
    buttons[1].textContent = 'Sign out'
    buttons[0].style.display = 'block'
    buttons[1].style.display = 'block'
    buttons[1].addEventListener('click', (event) => {
        localStorage.removeItem('key')
        document.getElementById('signup-form').classList.remove('cd-signin-modal__block--is-selected')
        document.getElementById('login-form').classList.remove('cd-signin-modal__block--is-selected')
        document.getElementById('sign-in-modal').classList.remove('cd-selected')
        document.getElementById('sign-up-modal').classList.add('cd-selected')
        document.querySelector('.cd-signin-modal').classList.add('cd-signin-modal--is-visible')
        document.querySelector('.films-list').style.filter = "blur(10px)"
        buttons[1].style.backgroundColor = '#2f889a'
        buttons[0].style.display = 'none'
        buttons[1].style.display = 'none'
        buttons[1].removeEventListener('click', {})
    })
}
const submitSingUp = (event) => {
    const user = {
        login: `${document.getElementById("signup-username").value}`,
        email: `${document.getElementById("signup-email").value}`,
        password: `${document.getElementById("signup-password").value}`
    };
    getUser().then(data => {
        if (data.find(el => {el.login.toLowerCase() === document.getElementById("signup-username").value.toLowerCase() || el.email === document.getElementById("signup-email").value.toLowerCase()})) {
            console.log('fail')
        } else(
            postUser(user),
            LogedIn(),
            event.target.reset(),
            console.log('added'))
    })
    event.preventDefault()
};
const submitSingIn = (event) => {
    event.preventDefault()
    getUser().then(data => {
        const comprasion = data.find(el => el.email.toLowerCase() === document.getElementById("signin-email").value.toLowerCase() && el.password === document.getElementById("signin-password").value)
        if (comprasion) {
            LogedIn()
            if (document.getElementById("remember-me").checked) {
                localStorage.setItem('key', comprasion.id)
            } else {
                localStorage.removeItem('key')
            }
        } else(console.log('-'))
        event.target.reset()
    })
};
getUser().then(data => {
    if (data.find(el => el.id === localStorage.getItem('key'))) {
        LogedIn()
    }
})
const switcher = (event) => {
    if (event.target === document.getElementById('sign-in-modal')) {
        document.getElementById('signup-form').classList.remove('cd-signin-modal__block--is-selected')
        document.getElementById('sign-up-modal').classList.remove('cd-selected')
        document.getElementById('sign-in-modal').classList.add('cd-selected')
        document.getElementById('login-form').classList.add('cd-signin-modal__block--is-selected')
    } else if (event.target === document.getElementById('sign-up-modal')) {
        document.getElementById('login-form').classList.remove('cd-signin-modal__block--is-selected')
        document.getElementById('sign-in-modal').classList.remove('cd-selected')
        document.getElementById('sign-up-modal').classList.add('cd-selected')
        document.getElementById('signup-form').classList.add('cd-signin-modal__block--is-selected')
    }
}
window.addEventListener('click', switcher)

document.querySelector('.cd-signin-modal').classList.add('cd-signin-modal--is-visible')
document.querySelector('.films-list').style.filter = "blur(15px)"
formSingUp.addEventListener('submit', submitSingUp);
formSingIn.addEventListener('submit', submitSingIn);