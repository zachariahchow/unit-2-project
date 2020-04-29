const express = require('express');
const Router = require('express-promise-router');
const router = new Router();
const path = require('path');
const session = require('express-session');
const gearController = require('../controllers/gear-controller.js');

router.use('/:route', express.static(path.join(__dirname, '..', '/public/')));

router.get('/type/:type', gearController.getGearByType);

router.get('/:id', gearController.getGearById);

router.delete('/:id', gearController.deleteGearById);

router.put('/:id/name', gearController.putEditGearNameById);

router.put('/:id/type', gearController.putEditGearTypeById);

router.put('/:id/img', gearController.putEditGearImgLinkById);

router.put('/:id', gearController.putEditGearById);

router.post('/', gearController.postAddGear);

router.get('/', gearController.getAllGear);

module.exports = router;