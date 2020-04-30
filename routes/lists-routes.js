const express = require('express');
const Router = require('express-promise-router');
const router = new Router();
const path = require('path');
const session = require('express-session');
const listsController = require('../controllers/lists-controller.js');

router.use('/:route', express.static(path.join(__dirname, '..', '/public/')));

router.post('/:id/gear/:gearId', listsController.postAddGearToList);

router.post('/:id/pedalboards/:pedalboardId', listsController.postAddPedalboardToList);

router.delete('/:id/gear/:gearId', listsController.deleteGearFromList);

router.delete('/:id/pedalboards/:pedalboardId', listsController.deletePedalboardFromList);

router.get('/:id/delete', listsController.deleteListById);

router.get('/:id', listsController.getListById);

router.put('/:id', listsController.putEditListById);

router.post('/', listsController.postAddList);

router.get('/', listsController.getAllLists);

module.exports = router;