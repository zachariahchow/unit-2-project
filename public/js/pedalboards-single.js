const pedalsSelect = document.querySelector('.single-pedalboard__pedals-list-select');
const addPedalBtn = document.querySelector('.single-pedalboard__pedals-list-add-btn');
const deletePedalBtns = document.querySelectorAll('.single-pedalboard__pedals-list-item-delete-btn');

deletePedalBtns.forEach(btn => {
    btn.addEventListener('click', async () => {

        const response = await sendHttpRequest('DELETE', `/pedalboards/${btn.dataset.pedalboardId}/${btn.dataset.gearId}`);

        console.log(response);
    })
})

addPedalBtn.addEventListener('click', async () => {
    const pedalEls = document.querySelectorAll('.single-pedalboard__pedal-wrapper');

    const response = await sendHttpRequest('POST', `/pedalboards/${pedalsSelect.dataset.pedalboardId}/${pedalsSelect.value}`, {
        gearOrder: pedalEls.length + 1
    }, { 'Content-Type': 'application/json' });

    console.log(response);

})