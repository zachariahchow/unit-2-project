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

        mainSection.insertAdjacentHTML('beforeend', `<iframe id="existing-iframe-example"
            src="https://www.youtube.com/embed/${videoId}?enablejsapi=1"
            frameborder="0"
            style="border: solid 4px #37474F"></iframe>`);

    } catch (err) {
        console.log(err);
    }
}

window.addEventListener('load', loadVideo);

const scrollHandler = async () => {

    // console.log(`Window Inner Height: ${window.innerHeight} \n Window Page Y Offset: ${window.pageYOffset} \n Body Offset Height: ${document.body.offsetHeight}`);

    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight &&
        document.querySelectorAll('iframe').length < 6) {

        loadVideo();
    }
}

window.addEventListener('scroll', scrollHandler);