const pedalsSelect = document.querySelector('.single-pedalboard__pedals-list-select');
const addPedalBtn = document.querySelector('.single-pedalboard__pedals-list-add-btn');

addPedalBtn.addEventListener('click', async () => {
    const pedalEls = document.querySelectorAll('.single-pedalboard__pedal-wrapper');

    const response = await sendHttpRequest('POST', `/pedalboards/${pedalsSelect.dataset.pedalboardId}/${pedalsSelect.value}`, {
        gearOrder: pedalEls.length + 1
    }, { 'Content-Type': 'application/json' });

    console.log(response);
})