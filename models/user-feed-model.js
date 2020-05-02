const { google } = require('googleapis');
const youtube = google.youtube({
    version: 'v3',
    auth: process.env.API_KEY_YOUTUBE
})

module.exports = {
    getVideosFromYoutube: async function(query) {
        const searchRes = await youtube.search.list({
            part: 'snippet',
            q: query,
            maxResults: 15
        });

        console.log(searchRes.data.items);
        return searchRes.data.items;
    }
}