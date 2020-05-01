const express = require('express');
const Router = require('express-promise-router');
const router = new Router();
const path = require('path');
const session = require('express-session');
const errorController = require('../controllers/404-controller');
const userProfileController = require('../controllers/user-profile-controller');

router.use('/:route', express.static(path.join(__dirname, '..', '/public/')));

router.put('/edit/name', userProfileController.putEditUserNameById);

router.put('/edit/img', userProfileController.putEditUserImgLinkById);

router.post('/edit/email', userProfileController.putEditUserEmailById);

router.use(errorController.get404Page);

module.exports = router;