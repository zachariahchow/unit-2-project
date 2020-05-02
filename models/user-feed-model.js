// const { google } = require('googleapis');
// const youtube = google.youtube({
//     version: 'v3',
//     auth: process.env.API_KEY_YOUTUBE
// })

const puppeteer = require('puppeteer');

module.exports = {
    // getVideosFromYoutube: async function(query) {
    //     try {
    //         const searchRes = await youtube.search.list({
    //             part: 'snippet',
    //             q: query,
    //             maxResults: 15
    //         });

    //         return searchRes.data.items;

    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    getVideosFromYoutube: async function(query) {
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();

        // const navPromise = page.waitForNavigation();

        await page.goto(`https://www.youtube.com/`);
        await page.waitForSelector('input#search');
        await page.type('input#search', query);

        // await Promise.all([page.click('#search-icon-legacy'), page.waitForNavigation({ timeout: 0 })])
        await page.click('#search-icon-legacy');

        const timeout = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        await timeout(700);
        // await page.waitForNavigation({ timeout: 0, waitUntil: 'load' });

        const getVideoLinks = await page.evaluate(() => {
            let videoLinks = [];

            const videoTags = document.querySelectorAll('a#video-title');

            for (let i = 0; i < 5; i++) {
                console.log(videoTags[i].href.split("=")[1]);
                videoLinks.push(videoTags[i].href.split("=")[1]);
            }
            // videoTags.forEach(tag => {
            //     console.log(tag.href);
            //     videoLinks.push(tag.href.split("=")[1]);
            // });

            return videoLinks;
        })

        console.log(getVideoLinks);
        return getVideoLinks;
    }
}