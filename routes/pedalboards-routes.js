const express = require('express');
const Router = require('express-promise-router');
const router = new Router();
const path = require('path');
const session = require('express-session');
const pedalboardsController = require('../controllers/pedalboards-controller.js');

router.use('/:route', express.static(path.join(__dirname, '..', '/public/')));

router.get('/:id', pedalboardsController.getPedalboardById);

router.delete('/:id', pedalboardsController.deletePedalboardById);

router.put('/:id', pedalboardsController.putEditPedalboardById);

router.post('/', pedalboardsController.postAddPedalboard);

router.get('/', pedalboardsController.getAllPedalboards);

module.exports = router;