const db = require('../db.js');

module.exports.getAllPedalboards = async (req, res) => {
    res.send('Get All Pedalboards');
}

module.exports.getPedalboardById = async (req, res) => {
    res.send('Get Pedalboard By Id');
}

//Consider turning these into AJAX calls to internalAPI endpoints, manipulate DOM rather than render new page
module.exports.postAddPedalboard = async (req, res) => {
    res.send('Post Add Pedalboard');
}

module.exports.putEditPedalboardById = async (req, res) => {
    res.send('Put Edit Pedalboard By Id');
}

module.exports.deletePedalboardById = async (req, res) => {

    res.send('Delete Pedalboard By Id');
}
//