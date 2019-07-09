// const countDownDate = new Date("July 9, 2019 17:00:00").getTime();
// const timer = document.querySelector('.timer');
// const timerInterval = () => {
//     setInterval(() => {
//         const now = new Date().getTime();
//         const difference = countDownDate - now;

//         const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//         const timeRem = `${hours} : ${minutes} : ${seconds} TO EXPLOSION`
//         console.log(countDownDate);
//         timer.textContent = timeRem;

//     }, 1000)
// }

// timerInterval()