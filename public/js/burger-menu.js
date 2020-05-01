const burgerIcon = document.querySelector('.header__menu');
const burgerMenu = document.querySelector('.burger-menu');
const burgerMenuCloseBtn = document.querySelector('.burger-menu__close-btn');

burgerIcon.addEventListener('click', () => {
    burgerMenu.classList.toggle('open');
})

burgerMenuCloseBtn.addEventListener('click', () => {
    burgerMenu.classList.toggle('open');
})

const imageInput = document.querySelector('.user-profile__input-img');
const nameInput = document.querySelector('.user-profile__input-name');
const emailInput = document.querySelector('.user-profile__input-email');
const userImg = document.querySelector('.user-profile__img');

imageInput.addEventListener('change', async () => {

    const response = await sendHttpRequest('PUT', `/user-profile/edit/img`, { field: imageInput.value }, { 'Content-Type': 'application/json' });

    userImg.setAttribute('src', response[0]['img_link']);

    console.log(response);
})

nameInput.addEventListener('change', async () => {

    const response = await sendHttpRequest('PUT', `/user-profile/edit/name`, { field: nameInput.value }, { 'Content-Type': 'application/json' });

    console.log(response);
})

emailInput.addEventListener('change', async () => {

    const response = await sendHttpRequest('PUT', `/user-profile/edit/email`, { field: emailInput.value }, { 'Content-Type': 'application/json' });

    console.log(response);
})