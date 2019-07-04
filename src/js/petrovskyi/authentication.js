import {
    postUser,
    getUser
} from './api'

const forms = document.querySelectorAll('form');
const formSingIn = forms[0];
const formSingUp = forms[1];

const submitSingUp = (event) => {
    const user = {
        login: `${document.getElementById("signup-username").value}`,
        email: `${document.getElementById("signup-email").value}`,
        password: `${document.getElementById("signup-password").value}`
    };
    getUser().then(data => {
        if (data.find(el => el.login.toLowerCase() === document.getElementById("signup-username").value.toLowerCase() || el.email === document.getElementById("signup-email").value.toLowerCase())) {
            console.log('fail')
        } else(
            postUser(user),
            document.querySelector('.cd-signin-modal').classList.remove('cd-signin-modal--is-visible'),
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
            console.log('+');
            document.querySelector('.cd-signin-modal').classList.remove('cd-signin-modal--is-visible')
                const buttons = document.querySelectorAll('.cd-main-nav__item')
                buttons[0].style.display = 'none';
                buttons[1].style.backgroundColor = 'red'
                buttons[1].textContent = 'Sign out'
                buttons[1].addEventListener('click',(event)=>{
                    buttons[0].style.display = 'block'
                    buttons[1].textContent = 'Sign up'
                    buttons[1].style.backgroundColor = '#2f889a'
                    buttons[1].removeEventListener('click',{})
                })
                if (document.getElementById("remember-me").checked) {
                    localStorage.setItem('key', comprasion.id)
                } else {
                    localStorage.removeItem('key')
                }
            } else(console.log('-'))
            event.target.reset()
        })
    };
   
    
formSingUp.addEventListener('submit', submitSingUp);
formSingIn.addEventListener('submit', submitSingIn);