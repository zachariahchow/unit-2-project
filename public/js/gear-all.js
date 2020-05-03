//Edit Gear Fields
const gearNameFields = document.querySelectorAll('.single-gear__name');
const gearSelects = document.querySelectorAll('.single-gear__select');
const gearImgLinkFields = document.querySelectorAll('.single-gear__img-input');

const onChangeHandler = async function(gearId, prop) {
    const response = await sendHttpRequest('PUT', `/gear/${gearId}/${prop}`, { field: this.value }, { 'Content-Type': 'application/json' });
    console.log(this.value);
}

gearNameFields.forEach(field => {
    field.addEventListener('change', onChangeHandler.bind(field, field.dataset.gearId, 'name'));
});

gearSelects.forEach(field => {
    field.addEventListener('change', onChangeHandler.bind(field, field.dataset.gearId, 'type'));
});

gearImgLinkFields.forEach(field => {
    field.addEventListener('change', onChangeHandler.bind(field, field.dataset.gearId, 'img'));
});

// See More Button

const seeMoreBtns = document.querySelectorAll('.single-gear__more-btn');
const gearWrapper = document.querySelector('.all-single-gear__wrapper');

const seeMoreBtnClickHandler = (ev) => {
    const gearType = ev.target.dataset.gearType;
    const gearId = ev.target.dataset.gearId
    const gearOptions = document.querySelectorAll(`.select-${gearId}>option`);

    gearOptions.forEach(option => {
        if (option.value == gearType) {
            option.setAttribute('selected', 'selected');
        }
    })

    const seeMoreSection = document.querySelector(`.more-${gearId}`);
    seeMoreSection.classList.toggle('display-none');

    if (ev.target.innerText.toLowerCase() == 'more') {
        ev.target.innerText = 'Close';
    } else {
        ev.target.innerText = 'More';
    }
}

seeMoreBtns.forEach((btn) => {
    btn.addEventListener('click', seeMoreBtnClickHandler);
})

//

const typeFilterSelect = document.querySelector('.filter__select');

const filterOnChangeHandler = async () => {

    const response = await sendHttpRequest('GET', `/gear/type/${typeFilterSelect.value}`);

    gearWrapper.innerHTML = "";

    if (response) {
        console.log(response);
        response.forEach(gear => {
            const gearContainer = document.createElement('div');
            gearContainer.setAttribute('key', gear.id);
            gearContainer.setAttribute('data-gear-id', gear.id)
            gearContainer.classList.add('single-gear__container');
            gearContainer.innerHTML =
                `<div class="single-gear__img-container">
                        <img src=${gear["img_link"]} alt=${gear.name} class="single-gear__img"/>
                    </div>
                <input class="single-gear__name input-primary" data-gear-id="${gear.id}" spellcheck="false" value="${gear.name}"></input>
                <button class="single-gear__delete-btn btn-secondary" data-gear-id="${gear.id}">DELETE</button>

                <div class="single-gear__more more-${gear.id} display-none wrapper-secondary">
                    <h4 class="single-gear__select-label">Type:</h4>
                    <select data-gear-id=${gear.id} class="single-gear__select select-${gear.id}" name="type">
                        <option value="guitar" class="single-gear__option">Guitar/Bass</option>
                        <option value="pedal" class="single-gear__option">Guitar/Bass Pedals</option>
                        <option value="amp" class="single-gear__option">Amplifiers & Monitors</option>
                        <option value="drums" class="single-gear__option">Drums & Percussion</option>
                        <option value="keyboard" class="single-gear__option">Keyboards/Synths</option>
                        <option value="accessory" class="single-gear__option">Accessories</option>
                        <input type="text" class="single-gear__img-input img-input-${gear.id} input-primary" value="${gear["img_link"]}" data-gear-id="${gear.id}"/>
                    </select>

                </div>

                <button data-gear-id=${gear.id} data-gear-type=${gear.type} class="single-gear__more-btn more-btn-${gear.id} btn-small">More</button>`;

            gearWrapper.append(gearContainer);

            document.querySelector(`.more-btn-${gear.id}`).addEventListener('click', seeMoreBtnClickHandler);

            const deleteBtn = document.querySelector(`.single-gear__delete-btn[data-gear-id="${gear.id}"]`);

            deleteBtn.addEventListener('click', async (ev) => {
                const response = await sendHttpRequest('DELETE', `/gear/${ev.target.dataset.gearId}`);

                const deletedGear = document.querySelector(`.single-gear__container[data-gear-id="${ev.target.dataset.gearId}"]`);

                gearWrapper.removeChild(deletedGear);

            })

            const gearNameField = document.querySelector(`.single-gear__name[data-gear-id="${gear.id}"]`);
            const gearSelect = document.querySelector(`.single-gear__select[data-gear-id="${gear.id}"]`);
            const gearImgLinkField = document.querySelector(`.single-gear__img-input[data-gear-id="${gear.id}"]`);


            gearNameField.addEventListener('change', onChangeHandler.bind(gearNameField, gearNameField.dataset.gearId, 'name'));

            gearSelect.addEventListener('change', onChangeHandler.bind(gearSelect, gearSelect.dataset.gearId, 'type'));

            gearImgLinkField.addEventListener('change', onChangeHandler.bind(gearImgLinkField, gearImgLinkField.dataset.gearId, 'img'));
        })
    }
}

typeFilterSelect.addEventListener('change', filterOnChangeHandler);

//Delete Gear Btns

const deleteGearBtns = document.querySelectorAll('.single-gear__delete-btn');
deleteGearBtns.forEach(btn => {
    btn.addEventListener('click', async (ev) => {
        const response = await sendHttpRequest('DELETE', `/gear/${ev.target.dataset.gearId}`);

        const deletedGear = document.querySelector(`.single-gear__container[data-gear-id="${ev.target.dataset.gearId}"]`);

        gearWrapper.removeChild(deletedGear);
    })
})


//Add Gear Item

const addItemBtn = document.querySelector('.add-form__submit-btn');
const addForm = document.querySelector('.add-form');


addItemBtn.addEventListener('click', async () => {

    if (document.querySelector('.add-form__msg'))
        addForm.removeChild(document.querySelector('.add-form__msg'));

    const existingGearEls = document.querySelectorAll('.single-gear__name');

    let nameExists = false;

    existingGearEls.forEach(el => {
        if (document.querySelector('.add-form__name-input').value == el.value) {
            nameExists = true;
        }
    })
    if (nameExists) {
        addForm.insertAdjacentHTML('beforeend', `<div class="add-form__msg"><h3 list-header>Item already exists</h3></div>`);
        return;
    }

    typeFilterSelect.value = document.querySelector('.add-form__select').value;
    await filterOnChangeHandler();

    const response = await sendHttpRequest('POST', `/gear`, {
        name: document.querySelector('.add-form__name-input').value,
        img: document.querySelector('.add-form__img-input').value,
        type: document.querySelector('.add-form__select').value
    }, { 'Content-Type': 'application/json' });

    console.log(response);
    const gear = response[0];

    // typeFilterSelect.value = response[0].type;


    const gearContainer = document.createElement('div');
    gearContainer.classList.add('single-gear__container');
    gearContainer.setAttribute('key', gear.id);
    gearContainer.setAttribute('data-gear-id', gear.id);
    gearContainer.innerHTML =
        `<div class="single-gear__img-container">
                <img src=${gear["img_link"]} alt=${gear.name} class="single-gear__img"/>
            </div>
        <input class="single-gear__name input-primary" data-gear-id="${gear.id}" spellcheck="false" value="${gear.name}"></input>
        <button class="single-gear__delete-btn btn-secondary" data-gear-id=${gear.id}>DELETE</button>

        <div class="single-gear__more more-${gear.id} display-none wrapper-secondary">
            <h4 class="single-gear__select-label">Type:</h4>
            <select data-gear-id=${gear.id} class="single-gear__select select-${gear.id}" name="type">
                <option value="guitar" class="single-gear__option">Guitar/Bass</option>
                <option value="pedal" class="single-gear__option">Guitar/Bass Pedals</option>
                <option value="amp" class="single-gear__option">Amplifiers & Monitors</option>
                <option value="drums" class="single-gear__option">Drums & Percussion</option>
                <option value="keyboard" class="single-gear__option">Keyboards/Synths</option>
                <option value="accessory" class="single-gear__option">Accessories</option>
                <input type="text" class="single-gear__img-input img-input-${gear.id} input-primary" value="${gear["img_link"]}" data-gear-id="${gear.id}"/>
            </select>

        </div>

        <button data-gear-id=${gear.id} data-gear-type=${gear.type} class="single-gear__more-btn more-btn-${gear.id} btn-small">More</button>`;

    gearWrapper.append(gearContainer);

    document.querySelector(`.more-btn-${gear.id}`).addEventListener('click', seeMoreBtnClickHandler);

    const deleteBtn = document.querySelector(`.single-gear__delete-btn[data-gear-id="${gear.id}"]`);

    deleteBtn.addEventListener('click', async (ev) => {
        const response = await sendHttpRequest('DELETE', `/gear/${ev.target.dataset.gearId}`);

        const deletedGear = document.querySelector(`.single-gear__container[data-gear-id="${ev.target.dataset.gearId}"]`);

        gearWrapper.removeChild(deletedGear);
    })

    const gearNameField = document.querySelector(`.single-gear__name[data-gear-id="${gear.id}"]`);
    const gearSelect = document.querySelector(`.single-gear__select[data-gear-id="${gear.id}"]`);
    const gearImgLinkField = document.querySelector(`.single-gear__img-input[data-gear-id="${gear.id}"]`);


    gearNameField.addEventListener('change', onChangeHandler.bind(gearNameField, gearNameField.dataset.gearId, 'name'));

    gearSelect.addEventListener('change', onChangeHandler.bind(gearSelect, gearSelect.dataset.gearId, 'type'));

    gearImgLinkField.addEventListener('change', onChangeHandler.bind(gearImgLinkField, gearImgLinkField.dataset.gearId, 'img'));
})

//Filter by Type