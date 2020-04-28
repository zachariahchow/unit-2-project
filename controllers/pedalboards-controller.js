const db = require('../db.js');
const Pedalboard = require('../models/pedalboards-model');
const Gear = require('../models/gear-model');

module.exports.getAllPedalboards = async (req, res) => {

    const allPedalboardsResult = await Pedalboard.getAll(req.session.userId);

    console.log(allPedalboardsResult);

    res.render('./pedalboards/pedalboards-all', { allPedalboards: allPedalboardsResult })
}

module.exports.getPedalboardById = async (req, res) => {

    const allPedalsResult = await Gear.getByType(req.session.userId, 'pedal');

    const getPedalboardResult = await Pedalboard.getById(req.params.id);

    const getPedalboardPedalsResult = await Pedalboard.getAllPedals(req.session.userId, req.params.id);

    const idsOfAddedPedals = getPedalboardPedalsResult
        .reduce((acc, pedal) => {
            acc.push(pedal['gear_id']);
            return acc;
        }, [])

    const allUnaddedPedals = allPedalsResult
        .filter(pedal => !idsOfAddedPedals.find(id => id == pedal.id));

    console.log(getPedalboardPedalsResult);

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

    res.json(addPedalboardResult);
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

module.exports.postAddPedalToPedalboard = async (req, res) => {

    const addPedalToPedalboardResult = await Gear.addToPedalboard(req.params.id, req.params.gearId, req.body.gearOrder);

    res.json(addPedalToPedalboardResult);
}

module.exports.deletePedalFromPedalboard = async (req, res) => {

    const deletePedalFromPedalboardResult = await Gear.removeFromPedalboard(req.params.id, req.params.gearId);

    res.json(deletePedalFromPedalboardResult);
}
//