const express = require('express');
const Router = require('express-promise-router');
const router = new Router();
const path = require('path');
const session = require('express-session');
const pedalboardsController = require('../controllers/pedalboards-controller.js');
const errorController = require('../controllers/404-controller');

router.use('/:route', express.static(path.join(__dirname, '..', '/public/')));

router.post('/:id/:gearId', pedalboardsController.postAddPedalToPedalboard);

router.delete('/:id/:gearId', pedalboardsController.deletePedalFromPedalboard);

router.get('/:id', pedalboardsController.getPedalboardById);

//Change this REST anti-pattern
router.get('/:id/delete', pedalboardsController.deletePedalboardById);
// router.delete('/:id', pedalboardsController.deletePedalboardById);
//

router.put('/:id', pedalboardsController.putEditPedalboardById);

router.post('/', pedalboardsController.postAddPedalboard);

router.get('/', pedalboardsController.getAllPedalboards);

router.use(errorController.get404Page);

module.exports = router;