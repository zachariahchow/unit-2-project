const express = require('express');
const Router = require('express-promise-router');
const router = new Router();
const path = require('path');
const session = require('express-session');
const errorController = require('../controllers/404-controller');
const userFeedController = require('../controllers/user-feed-controller');

router.get('/videos', userFeedController.getUserGearVideos);

module.exports = router;