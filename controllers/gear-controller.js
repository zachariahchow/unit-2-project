const db = require('../db.js');

module.exports.getAllGear = async (req, res) => {
    res.send('Get All Gear');
}

module.exports.getGearById = async (req, res) => {
    res.send('Get Gear By Id');
}

//Consider turning these into AJAX calls to internalAPI endpoints, manipulate DOM rather than render new page
module.exports.postAddGear = async (req, res) => {
    res.send('Post Add Gear');
}

module.exports.putEditGearById = async (req, res) => {
    res.send('Put Edit Gear By Id');
}

module.exports.deleteGearById = async (req, res) => {
    res.send('Delete Gear By Id');
}
//