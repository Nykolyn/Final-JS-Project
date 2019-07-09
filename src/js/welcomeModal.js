import Swal from 'sweetalert2';
import {
    getUserName
} from './services/api'

 const welcomeModale = () => {
    const welcomeId = sessionStorage.getItem('id') === null ? localStorage.getItem('key') : sessionStorage.getItem('id')
    getUserName(welcomeId).then(user => {
        Swal.fire({
            title: `Welcome ${user.login}! `,
            text: 'In your collection',
            width: 600,
            // animation: false,
            showConfirmButton: false,
            customClass: 'animated bounce',
            timer: 10500,
            type: 'success',
            padding: '10em',
            // background: '#fff url("http://www.coolwebmasters.com/uploads/posts/2010-10/1287573191_patterns-42.jpg")',
            backdrop: `
            rgba(0,0,123,0.4)
            url("https://i.gifer.com/PYh.gif")
            center left
            no-repeat
            `,
        });
    })
}

export const handleModalWelcome = () => {
    welcomeModale()
};

// const open = document.getElementById('submit-signin')
// if (localStorage.getItem('key')) {
//     welcomeModale()
// }

// open.addEventListener('click', handleModalWelcome);