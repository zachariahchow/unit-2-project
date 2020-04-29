// See More Button

const seeMoreBtns = document.querySelectorAll('.single-gear__more-btn');

seeMoreBtnClickHandler = (ev) => {
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


//Add Gear Item

const addItemBtn = document.querySelector('.add-form__submit-btn');
const addForm = document.querySelector('.add-form');
const gearWrapper = document.querySelector('.all-single-gear__wrapper');

addItemBtn.addEventListener('click', async () => {
    const response = await sendHttpRequest('POST', `/gear`, {
        name: document.querySelector('.add-form__name-input').value,
        img: document.querySelector('.add-form__img-input').value,
        type: document.querySelector('.add-form__select').value
    }, { 'Content-Type': 'application/json' });

    console.log(response);
    const gear = response[0];

    gearContainer = document.createElement('div');
    gearContainer.setAttribute("key", gear.id);
    gearContainer.innerHTML =
        `<div class="single-gear__img-container">
                <img src=${gear["img_link"]} alt=${gear.name} class="single-gear__img"/>
            </div>
        <a href='./gear/${gear.id}' class="single-gear__name">${gear.name}</a>

        <div class="single-gear__more more-${gear.id} display-none">
            <h4 class="single-gear__select-label">Type:</h4>
            <select data-gear-id={gear.id} class="single-gear__select select-${gear.id}" name="type">
                <option value="guitar" class="single-gear__option">Guitar/Bass</option>
                <option value="pedal" class="single-gear__option">Guitar/Bass Pedals</option>
                <option value="amp" class="single-gear__option">Amplifiers & Monitors</option>
                <option value="drums" class="single-gear__option">Drums & Percussion</option>
                <option value="keyboard" class="single-gear__option">Keyboards/Synths</option>
                <option value="accessory" class="single-gear__option">Accessories</option>
                <input type="text" class="single-gear__img-input img-input-${gear.id}" value="${gear["img_link"]}" />
            </select>

        </div>

        <button data-gear-id=${gear.id} data-gear-type=${gear.type} class="single-gear__more-btn more-btn-${gear.id}">More</button>`;

    gearWrapper.append(gearContainer);

    document.querySelector(`.more-btn-${gear.id}`).addEventListener('click', seeMoreBtnClickHandler);
})

//Filter by Type

const typeFilterSelect = document.querySelector('.filter__select');

typeFilterSelect.addEventListener('change', async () => {

    const response = await sendHttpRequest('GET', `/gear/type/${typeFilterSelect.value}`);

    gearWrapper.innerHTML = "";

    if (response) {
        console.log(response);
        response.forEach(gear => {
            gearContainer = document.createElement('div');
            gearContainer.setAttribute('key', gear.id);
            gearContainer.classList.add('single-gear__container');
            gearContainer.innerHTML =
                `<div class="single-gear__img-container">
                        <img src=${gear["img_link"]} alt=${gear.name} class="single-gear__img"/>
                    </div>
                <a href='./gear/${gear.id}' class="single-gear__name">${gear.name}</a>

                <div class="single-gear__more more-${gear.id} display-none">
                    <h4 class="single-gear__select-label">Type:</h4>
                    <select data-gear-id={gear.id} class="single-gear__select select-${gear.id}" name="type">
                        <option value="guitar" class="single-gear__option">Guitar/Bass</option>
                        <option value="pedal" class="single-gear__option">Guitar/Bass Pedals</option>
                        <option value="amp" class="single-gear__option">Amplifiers & Monitors</option>
                        <option value="drums" class="single-gear__option">Drums & Percussion</option>
                        <option value="keyboard" class="single-gear__option">Keyboards/Synths</option>
                        <option value="accessory" class="single-gear__option">Accessories</option>
                        <input type="text" class="single-gear__img-input img-input-${gear.id}" value="${gear["img_link"]}" />
                    </select>

                </div>

                <button data-gear-id=${gear.id} data-gear-type=${gear.type} class="single-gear__more-btn more-btn-${gear.id}">More</button>`;

            gearWrapper.append(gearContainer);

            document.querySelector(`.more-btn-${gear.id}`).addEventListener('click', seeMoreBtnClickHandler);
        })
    }

})