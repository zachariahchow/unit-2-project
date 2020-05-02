mainSection = document.querySelector('main');

const loadVideo = async () => {

    const response = await sendHttpRequest('GET', `/user-feed/videos`);

    console.log(response);

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    randomIndex = getRandomInt(0, 15);

    const videoId = response[randomIndex].id.videoId

    mainSection.insertAdjacentHTML('beforeend', `<iframe id="existing-iframe-example"
        width="534" height="300"
        src="https://www.youtube.com/embed/${videoId}?enablejsapi=1"
        frameborder="0"
        style="border: solid 4px #37474F"></iframe>`);
}

window.addEventListener('load', loadVideo);

const scrollHandler = async () => {

    // console.log(`Window Inner Height: ${window.innerHeight} \n Window Page Y Offset: ${window.pageYOffset} \n Body Offset Height: ${document.body.offsetHeight}`);

    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        await loadVideo();
    }
}

window.addEventListener('scroll', scrollHandler);