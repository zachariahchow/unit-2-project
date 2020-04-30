const burgerIcon = document.querySelector('.header__menu');
const burgerMenu = document.querySelector('.burger-menu');
const burgerMenuCloseBtn = document.querySelector('.burger-menu__close-btn');

burgerIcon.addEventListener('click', () => {
    burgerMenu.classList.toggle('open');
})

burgerMenuCloseBtn.addEventListener('click', () => {
    burgerMenu.classList.toggle('open');
})