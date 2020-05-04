mainSection = document.querySelector('main');

let videoLinksArr = [];

const loadVideo = async () => {

    try {

        const response = await sendHttpRequest('GET', `/user-feed/videos`);

        console.log(response);

        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        const randomIndex = getRandomInt(0, 5);

        // const videoId = response[randomIndex].id.videoId
        const videoId = response[randomIndex];

        const loadingEl = document.querySelector('.loading-el__wrapper');

        mainSection.removeChild(loadingEl);

        mainSection.insertAdjacentHTML('beforeend', `<div class="iframe__container"> <iframe id="existing-iframe-example"
            src="https://www.youtube.com/embed/${videoId}?enablejsapi=1"
            frameborder="0"
            style="border: solid 4px #37474F"></iframe>
            </div>`);

    } catch (err) {
        console.log(err);
    }
}

window.addEventListener('load', () => {

    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        const loadingEl = document.createElement('div');
        loadingEl.classList.add('loading-el__wrapper');
        loadingEl.innerHTML = (`<div class="black-one"></div>
                                    <div class="grey-one"></div>
                                    <div class="black-two"></div>
                                    <div class="grey-two"></div>`);
        // const loadingEl = document.createElement('div');
        // loadingEl.classList.add('loading-el');
        // loadingEl.innerText = 'Loading Feed...';

        mainSection.appendChild(loadingEl);
    }
})

window.addEventListener('load', loadVideo);

const scrollHandler = async () => {

    // console.log(`Window Inner Height: ${window.innerHeight} \n Window Page Y Offset: ${window.pageYOffset} \n Body Offset Height: ${document.body.offsetHeight}`);

    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight &&
        document.querySelectorAll('iframe').length < 6) {

        if (!document.querySelector('.loading-el__wrapper')) {

            const loadingEl = document.createElement('div');
            // loadingEl.classList.add('loading-el');
            // loadingEl.innerText = 'Loading Feed...';

            loadingEl.classList.add('loading-el__wrapper');
            loadingEl.innerHTML = (`<div class="black-one"></div>
                                    <div class="grey-one"></div>
                                    <div class="black-two"></div>
                                    <div class="grey-two"></div>`);

            mainSection.appendChild(loadingEl);

        }

        await loadVideo();

        if (document.querySelector('.loading-el__wrapper')) {
            mainSection.removeChild(loadingEl);
        }
    }
}

window.addEventListener('scroll', scrollHandler);