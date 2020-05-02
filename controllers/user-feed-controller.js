const userFeed = require('../models/user-feed-model');
const Gear = require('../models/gear-model');

module.exports.getUserGearVideos = async (req, res) => {

    const getGearResult = await Gear.getAll(req.session.userId);

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const randomGearIndex = getRandomInt(0, getGearResult.length);

    const getVideosResult = await userFeed.getVideosFromYoutube(getGearResult[randomGearIndex].name);

    console.log(getVideosResult)

    res.json(getVideosResult);
}