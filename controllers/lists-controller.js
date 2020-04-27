const db = require('../db.js');

module.exports.getAllLists = async (req, res) => {
    res.send('Get All Lists');
}

module.exports.getListById = async (req, res) => {
    res.send('Get List By Id');
}

//Consider turning these into AJAX calls to internalAPI endpoints, manipulate DOM rather than render new page
module.exports.postAddList = async (req, res) => {
    res.send('Post Add List');
}

module.exports.putEditListById = async (req, res) => {
    res.send('Put Edit List By Id');
}

module.exports.deleteListById = async (req, res) => {
    res.send('Delete List By Id');
}
//