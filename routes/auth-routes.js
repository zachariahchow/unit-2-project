const express = require('express');
const Router = require('express-promise-router');
const router = new Router();
const path = require('path');
const session = require('express-session');
const authController = require('../controllers/auth-controller.js');
const errorController = require('../controllers/404-controller');

router.use('/:route', express.static(path.join(__dirname, '..', '/public/')));

router.get('/login', authController.getLogin);

router.get('/register', authController.getRegister);

router.post('/login', authController.postLogin);

router.post('/register', authController.postRegister);

router.post('/logout', authController.postLogout);

router.get('/', authController.getAuthIndex);

router.use(errorController.get404Page);

module.exports = router;