const express = require('express');
const Router = require('express-promise-router');
const router = new Router();
const path = require('path');
const session = require('express-session');
const listsController = require('../controllers/lists-controller.js');

router.use('/:route', express.static(path.join(__dirname, '..', '/public/')));

router.get('/:id', listsController.getListById);

router.delete('/:id', listsController.deleteListById);

router.put('/:id', listsController.putEditListById);

router.post('/', listsController.postAddList);

router.get('/', listsController.getAllLists);

module.exports = router;