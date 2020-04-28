const db = require('../db.js');
const Pedalboard = require('../models/pedalboards-model');

module.exports.getAllPedalboards = async (req, res) => {

    const allPedalboardsResult = await Pedalboard.getAll(req.session.userId);

    console.log(allPedalboardsResult);

    res.send(allPedalboardsResult);
}

module.exports.getPedalboardById = async (req, res) => {

    const getPedalboardResult = await Pedalboard.getById(req.session.userId);

    console.log(getPedalboardResult);

    res.send(getPedalboardResult);
}

//Consider turning these into AJAX calls to internalAPI endpoints, manipulate DOM rather than render new page
module.exports.postAddPedalboard = async (req, res) => {

    newPedalboard = new Pedalboard(req.session.userId, req.body.name);

    const addPedalboardResult = await newPedalboard.add()

    res.send(addPedalboardResult);
}

module.exports.putEditPedalboardById = async (req, res) => {

    const editPedalboardResult = await Pedalboard.editById(req.session.userId, req.params.id);

    res.send(editPedalboardResult);
}

module.exports.deletePedalboardById = async (req, res) => {

    const deletePedalboardResult = await Pedalboard.deleteById(req.params.id);

    res.send(deletePedalboardResult);
}
//