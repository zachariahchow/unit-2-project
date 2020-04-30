const addGearBtn = document.querySelector('.single-list__gear-add-btn');
const addPedalboardBtn = document.querySelector('.single-list__pedalboards-add-btn');

const gearSelect = document.querySelector('.single-list__gear-list-select');
const pedalboardsSelect = document.querySelector('.single-list__pedalboards-list-select');

const gearList = document.querySelector('.single-list__all-gear-wrapper');
const pedalboardsList = document.querySelector('.single-list__all-pedalboards-wrapper');

const deleteGearBtns = document.querySelectorAll('.single-gear__list-item-delete-btn');
const deletePedalboardBtn = document.querySelector('.single-pedalboard__list-item-delete-btn');

window.addEventListener('load',
    (ev) => {
        if (document.querySelector('.single-pedalboard__wrapper')) {
            addPedalboardBtn.classList.add('display-none');
            pedalboardsSelect.classList.add('display-none');
        }
    })

deleteGearBtns.forEach(btn => {
    btn.addEventListener('click', async (ev) => {
        const response = await sendHttpRequest('DELETE', `/lists/${gearSelect.dataset.listId}/gear/${ev.target.dataset.gearId}`);

        const deletedGear = document.querySelector(`.gear-wrapper-${ev.target.dataset.gearId}`)

        gearList.removeChild(deletedGear);

        console.log(response);

        addedGearOptionHTML = `<option value=${response.deletedGear.id} data-gear-name=${response.deletedGear.name} class="gear-option">${response.deletedGear.name}</option>`

        gearSelect.insertAdjacentHTML('beforeend', addedGearOptionHTML);
    })
})

addGearBtn.addEventListener('click', async () => {

    const response = await sendHttpRequest('POST', `/lists/${gearSelect.dataset.listId}/gear/${gearSelect.value}`);

    console.log(response);

    const deletedOption = document.querySelector(`option[value="${response.newGear.id}"]`);

    gearSelect.removeChild(deletedOption);

    const newGearEl = document.createElement('div');
    newGearEl.classList.add('single-gear__wrapper');
    newGearEl.classList.add(`gear-wrapper-${response.newGear.id}`);
    newGearEl.setAttribute('data-gear-id', `${response.newGear.id}`);
    newGearEl.innerHTML = `
    <div class="single-gear__wrapper gear-wrapper-${response.newGear.id} wrapper-primary" data-gear-id=${response.newGear.id}>
        <li class="gear-list-item">
            ${response.newGear.name}
        </li>
        <div class="single-gear__img-container">
            <img src=${response.newGear["img_link"]} alt=${response.newGear.name} class="single-pedal__img"/>
        </div>
        <button type="button" data-list-id=${response.listGear['list_id']} data-gear-id=${response.newGear.id} class="single-gear__list-item-delete-btn btn-secondary">Delete</button>
    </div>`


    gearList.append(newGearEl);

    const newDeleteGearBtn = document.querySelector(`button[data-gear-id='${response.newGear.id}']`);

    newDeleteGearBtn.addEventListener('click', async (ev) => {

        const response = await sendHttpRequest('DELETE', `/lists/${gearSelect.dataset.listId}/gear/${ev.target.dataset.gearId}`);

        const deletedGear = document.querySelector(`.gear-wrapper-${ev.target.dataset.gearId}`)

        gearList.removeChild(deletedGear);

        console.log(response);

        addedGearOptionHTML = `<option value=${response.deletedGear.id} data-gear-name=${response.deletedGear.name} class="gear-option">${response.deletedGear.name}</option>`

        gearSelect.insertAdjacentHTML('beforeend', addedGearOptionHTML);

    })
})

if (deletePedalboardBtn)
    deletePedalboardBtn.addEventListener('click', async (ev) => {
        addPedalboardBtn.classList.remove('display-none');
        pedalboardsSelect.classList.remove('display-none');

        const response = await sendHttpRequest('DELETE', `/lists/${pedalboardsSelect.dataset.listId}/pedalboards/${ev.target.dataset.pedalboardId}`);

        const deletedPedalboard = document.querySelector(`.pedalboard-wrapper-${ev.target.dataset.pedalboardId}`)

        pedalboardsList.removeChild(deletedPedalboard);

        console.log(response);

        addedPedalboardOptionHTML = `<option value=${response.deletedPedalboard.id} data-pedalboard-name=${response.deletedPedalboard.name} class="pedalboard-option">${response.deletedPedalboard.name}</option>`

        pedalboardsSelect.insertAdjacentHTML('beforeend', addedPedalboardOptionHTML);
    })


addPedalboardBtn.addEventListener('click', async (ev) => {
    addPedalboardBtn.classList.add('display-none');
    pedalboardsSelect.classList.add('display-none');

    const response = await sendHttpRequest('POST', `/lists/${pedalboardsSelect.dataset.listId}/pedalboards/${pedalboardsSelect.value}`);

    console.log(response);

    const deletedOption = document.querySelector(`.pedalboard-option[value="${response.newPedalboard.id}"]`);

    pedalboardsSelect.removeChild(deletedOption);

    const addedPedalboardHTML = `
        <div class="single-pedalboard__wrapper pedalboard-wrapper-${response.newPedalboard.id} wrapper-primary">
            <a href="/pedalboards/${response.newPedalboard.id}" class="pedalboard-list-item link-secondary">
                ${response.newPedalboard.name}
            </a>
            <button type="button" data-pedalboard-id=${response.newPedalboard.id} class="single-pedalboard__list-item-delete-btn btn-secondary">Delete</button>
        </div>`

    pedalboardsList.insertAdjacentHTML('beforeend', addedPedalboardHTML);

    const newDeletePedalboardBtn = document.querySelector('.single-pedalboard__list-item-delete-btn');

    newDeletePedalboardBtn.addEventListener('click', async (ev) => {
        addPedalboardBtn.classList.remove('display-none');
        pedalboardsSelect.classList.remove('display-none');

        const response = await sendHttpRequest('DELETE', `/lists/${pedalboardsSelect.dataset.listId}/pedalboards/${ev.target.dataset.pedalboardId}`);

        const deletedPedalboard = document.querySelector(`.pedalboard-wrapper-${ev.target.dataset.pedalboardId}`)

        pedalboardsList.removeChild(deletedPedalboard);

        console.log(response);

        addedPedalboardOptionHTML = `<option value=${response.deletedPedalboard.id} data-pedalboard-name=${response.deletedPedalboard.name} class="pedalboard-option">${response.deletedPedalboard.name}</option>`

        pedalboardsSelect.insertAdjacentHTML('beforeend', addedPedalboardOptionHTML);
    });

})