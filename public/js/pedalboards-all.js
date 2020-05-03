const addPedalboardBtn = document.querySelector('.add-form__submit-btn');
const addForm = document.querySelector('.add-form');

addPedalboardBtn.addEventListener('click', async (ev) => {

    if (document.querySelector('.add-form__msg'))
        addForm.removeChild(document.querySelector('.add-form__msg'));

    const existingPedalboardEls = document.querySelectorAll('.single-pedalboard__name');

    let nameExists = false;

    existingPedalboardEls.forEach(el => {
        if (document.querySelector('.add-form__name-input').value.toLowerCase() == el.innerText.toLowerCase()) {
            ev.preventDefault();
            nameExists = true;
        }
    })

    if (nameExists) {
        addForm.insertAdjacentHTML('beforeend', `<div class="add-form__msg"><h3 class="list-header">Pedalboard name already exists</h3></div>`);
        return;
    }

})