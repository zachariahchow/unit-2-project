const addGearBtn = document.querySelector('.single-list__gear-add-btn');
const addPedalboardBtn = document.querySelector('.single-list__pedalboards-add-btn');

const gearSelect = document.querySelector('.single-list__gear-list-select');
const pedalboardsSelect = document.querySelector('.single-list__pedalboards-list-select');

const gearList = document.querySelector('.single-list__all-gear-wrapper');
const pedalboardsList = document.querySelector('.single-list__all-pedalboards-wrapper');

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
    <div className=single-gear__wrapper gear-wrapper-${response.newGear.id} data-gear-id=${response.newGear.id}>
        <li className="gear-list-item">
            ${response.newGear.name}
        </li>
        <div className="single-gear__img-container">
            <img src=${response.newGear["img_link"]} alt=${response.newGear.name} className="single-pedal__img"/>
        </div>
        <button type="button" data-list-id=${response.listGear['list_id']} data-gear-id=${response.newGear.id} className="single-gear__list-item-delete-btn">Delete</button>
    </div>`


    gearList.append(newGearEl);
})