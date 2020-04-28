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
        `<div className="single-gear__img-container">
                <img src=${gear["img_link"]} alt=${gear.name} className="single-gear__img"/>
            </div>
        <a href='./gear/${gear.id}' className="single-gear__name">${gear.name}</a>`;

    gearWrapper.append(gearContainer);
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
            gearContainer.setAttribute("key", gear.id);
            gearContainer.innerHTML =
                `<div className="single-gear__img-container">
                        <img src=${gear["img_link"]} alt=${gear.name} className="single-gear__img"/>
                    </div>
                <a href='./gear/${gear.id}' className="single-gear__name">${gear.name}</a>`;
            gearWrapper.append(gearContainer);
        })
    }

})