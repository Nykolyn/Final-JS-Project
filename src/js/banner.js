const banner = document.querySelector('.banner');


banner.addEventListener('mousemove', startRotate);
banner.addEventListener('mouseout', stopRotate);



function startRotate(event) {
    const bannerItem = this.querySelector('.banner-item'); 
    const halfHeight = bannerItem.offsetHeight / 2; 
    bannerItem.style.transform = 'rotateX(' + - (event.offsetY - halfHeight) / 7 + 'deg) rotateY(' + (event.offsetX - halfHeight) / 7 + 'deg)';  
}

function stopRotate(event) {
    const bannerItem = this.querySelector('.banner-item'); 
    // const halfHeight = bannerItem.offsetHeight / 2; 
    bannerItem.style.transform = 'rotateX(0)';  
}
