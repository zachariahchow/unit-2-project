const db = require('../db.js');
const Pedalboard = require('../models/pedalboards-model');
const Gear = require('../models/gear-model');
const errorController = require('../controllers/404-controller');

module.exports.getAllPedalboards = async (req, res) => {

    const allPedalboardsResult = await Pedalboard.getAll(req.session.userId);

    console.log(allPedalboardsResult);

    res.render('./pedalboards/pedalboards-all', {
        allPedalboards: allPedalboardsResult,
        currentUser: req.session.currentUser
    })
}

module.exports.getPedalboardById = async (req, res) => {

    try {

        const getPedalboardResult = await Pedalboard.getById(req.params.id);

        if (!getPedalboardResult[0]) {
            errorController.get404Page(req, res);
            console.log('Cannot find Pedalboard');
        }

        const allPedalsResult = await Gear.getByType(req.session.userId, 'pedal');

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
            singlePedalboardPedals: getPedalboardPedalsResult,
            currentUser: req.session.currentUser
        });

    } catch (err) {
        console.log(err);
        errorController.get404Page(req, res);
    }
}

//Consider turning these into AJAX calls to internalAPI endpoints, manipulate DOM rather than render new page
module.exports.postAddPedalboard = async (req, res) => {

    newPedalboard = new Pedalboard(req.session.userId, req.body.name);

    console.log(newPedalboard);

    const addPedalboardResult = await newPedalboard.add();

    res.redirect(`/pedalboards/${addPedalboardResult[0].id}`);
}

module.exports.putEditPedalboardById = async (req, res) => {

    const editPedalboardResult = await Pedalboard.editById(req.session.userId, req.params.id);

    res.send(editPedalboardResult);
}

module.exports.deletePedalboardById = async (req, res) => {

    const deletePedalboardResult = await Pedalboard.deleteById(req.params.id);

    res.redirect('/pedalboards');
}

//

module.exports.postAddPedalToPedalboard = async (req, res) => {

    const addPedalToPedalboardResult = await Gear.addToPedalboard(req.params.id, req.params.gearId, req.body.gearOrder);

    const newGearPedal = await Gear.getById(req.params.gearId)

    res.json({
        pedalboard: addPedalToPedalboardResult[0],
        newPedal: newGearPedal[0]
    });
}

module.exports.deletePedalFromPedalboard = async (req, res) => {

    const deletePedalFromPedalboardResult = await Gear.removeFromPedalboard(req.params.id, req.params.gearId);

    const deletedGearPedal = await Gear.getById(req.params.gearId)

    res.json({
        pedalboard: deletePedalFromPedalboardResult[0],
        deletedPedal: deletedGearPedal[0]
    });
}
//