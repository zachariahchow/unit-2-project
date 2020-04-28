const db = require('../db.js');
const Pedalboard = require('../models/pedalboards-model');
const Gear = require('../models/gear-model');

module.exports.getAllPedalboards = async (req, res) => {

    const allPedalboardsResult = await Pedalboard.getAll(req.session.userId);

    console.log(allPedalboardsResult);

    res.send(allPedalboardsResult);
}

module.exports.getPedalboardById = async (req, res) => {

    const allPedalsResult = await Gear.getByType(req.session.userId, 'pedal');

    console.log(allPedalsResult);

    const getPedalboardResult = await Pedalboard.getById(req.session.userId);

    const getPedalboardPedalsResult = await Pedalboard.getAllPedals(req.session.userId, req.params.id);

    const idsOfAddedPedals = getPedalboardPedalsResult
        .reduce((acc, pedal) => {
            acc.push(pedal['gear_id']);
            return acc;
        }, [])

    const allUnaddedPedals = allPedalsResult
        .filter(pedal => !idsOfAddedPedals.find(id => id == pedal.id));

    console.log(getPedalboardResult);

    res.render('./pedalboards/pedalboards-single', {
        allUnaddedPedals: allUnaddedPedals,
        singlePedalboard: getPedalboardResult[0],
        singlePedalboardPedals: getPedalboardPedalsResult
    });
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