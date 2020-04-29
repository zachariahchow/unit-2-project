const db = require('../db.js');
const List = require('../models/lists-model');

module.exports.getAllLists = async (req, res) => {

    const getAllListsResult = await List.getAll(req.session.userId);

    res.render('./lists/lists-all', { allLists: getAllListsResult });
}

module.exports.getListById = async (req, res) => {

    const getListResult = await List.getById(req.params.id);

    res.send(getListResult);
}

//Consider turning these into AJAX calls to internalAPI endpoints, manipulate DOM rather than render new page
module.exports.postAddList = async (req, res) => {

    const newList = new List(req.session.userId, req.body.name);

    const addListResult = await newList.add();

    res.send(addListResult);
}

module.exports.putEditListById = async (req, res) => {

    const editListResult = await List.editById(req.params.id, req.body.name);

    res.send(editListResult);
}

module.exports.deleteListById = async (req, res) => {

    const deleteListResult = await List.deleteById(listId);

    res.send(deleteListResult);
}
//