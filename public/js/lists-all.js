const addListBtn = document.querySelector('.add-form__submit-btn');
const addForm = document.querySelector('.add-form');

addListBtn.addEventListener('click', async (ev) => {

    if (document.querySelector('.add-form__msg'))
        addForm.removeChild(document.querySelector('.add-form__msg'));

    const existingListEls = document.querySelectorAll('.single-list__name');

    let nameExists = false;

    existingListEls.forEach(el => {
        if (document.querySelector('.add-form__name-input').value.toLowerCase() == el.innerText.toLowerCase()) {
            ev.preventDefault();
            nameExists = true;
        }
    })

    if (nameExists) {
        addForm.insertAdjacentHTML('beforeend', `<div class="add-form__msg"><h3 list-header>Item already exists</h3></div>`);
        return;
    }

})