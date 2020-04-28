const typeFilterSelect = document.querySelector('.filter__select');

typeFilterSelect.addEventListener('change', async () => {

    const response = await sendHttpRequest('GET', `/gear/type/${typeFilterSelect.value}`);

    console.log(response);

    const gearWrapper = document.querySelector('.all-single-gear__wrapper');

    gearWrapper.innerHTML = "";

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

})


// const selectOnChangeHandler = () => {
//     sendHttpRequest
// }