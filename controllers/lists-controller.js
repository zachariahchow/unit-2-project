const db = require('../db.js');
const List = require('../models/lists-model');
const Pedalboard = require('../models/pedalboards-model');
const Gear = require('../models/gear-model');
const errorController = require('../controllers/404-controller');

module.exports.getAllLists = async (req, res) => {

    const getAllListsResult = await List.getAll(req.session.userId);

    res.render('./lists/lists-all', {
        allLists: getAllListsResult,
        currentUser: req.session.currentUser
    });
}

module.exports.getListById = async (req, res) => {

    try {

        const getListResult = await List.getById(req.params.id);

        if (!getListResult[0]) {
            errorController.get404Page(req, res);
            console.log('Cannot find List item');
        }

        const getListPedalboardsResult = await List.getListPedalboards(req.params.id);

        let listPedalboardsPedals = [];

        for (const pedalboard of getListPedalboardsResult) {

            const getAllPedalsResult = await Pedalboard.getAllPedals(req.session.userId, pedalboard['pedalboard_id']);

            listPedalboardsPedals.push({
                id: pedalboard['pedalboard_id'],
                name: pedalboard.name,
                pedals: getAllPedalsResult
            })
        }

        const getListGearResult = await List.getListGear(req.params.id);

        const getAllGearResult = await Gear.getAll(req.session.userId);

        const getAllPedalboardsResult = await Pedalboard.getAll(req.session.userId);

        // console.log(getAllGearResult);
        // console.log(getAllPedalboardsResult);
        // console.log(getListPedalboardsResult);
        // console.log(getListResult[0]);

        const allGearWithoutListGear = getAllGearResult
            .reduce((resultsArr, gear) => {

                if (listPedalboardsPedals.length < 1) {

                    resultsArr.push(gear)

                } else {

                    listPedalboardsPedals
                        .forEach(pedalboard => {
                            if (!pedalboard.pedals
                                .find(pedal => pedal['gear_id'] == gear.id)) {
                                resultsArr.push(gear);
                            }
                        })
                }
                return resultsArr;

            }, []).filter(gear => {
                return (!getListGearResult
                    .find(listGear => listGear['gear_id'] == gear.id));
            });

        const allPedalboardsWithoutListPedalboards = getAllPedalboardsResult
            .filter(pedalboard => {
                return (!getListPedalboardsResult.find(listPb =>
                    listPb['pedalboard_id'] == pedalboard.id
                ))
            });

        // console.log(allGearWithoutListGear);
        // console.log(allPedalboardsWithoutListPedalboards);

        console.log(allGearWithoutListGear);

        res.render('./lists/lists-single', {
            allGear: allGearWithoutListGear,
            allPedalboards: allPedalboardsWithoutListPedalboards,
            singleList: getListResult[0],
            listGear: getListGearResult,
            listPedalboards: listPedalboardsPedals,
            currentUser: req.session.currentUser
        });

    } catch (err) {
        console.log(err);
        errorController.get404Page(req, res);
    }

}

//Consider turning these into AJAX calls to internalAPI endpoints, manipulate DOM rather than render new page
module.exports.postAddList = async (req, res) => {

    const newList = new List(req.session.userId, req.body.name);

    const addListResult = await newList.add();

    res.redirect(`/lists/${addListResult[0].id}`);
}

module.exports.putEditListById = async (req, res) => {

    const editListResult = await List.editById(req.params.id, req.body.name);

    res.send(editListResult);
}

module.exports.deleteListById = async (req, res) => {

    const deleteListResult = await List.deleteById(req.params.id);

    res.redirect(`/lists`);
}

module.exports.postAddGearToList = async (req, res) => {

    const addGearToListResult = await Gear.addToList(req.params.id, req.params.gearId);

    const newGearInList = await Gear.getById(req.params.gearId)

    res.json({
        listGear: addGearToListResult[0],
        newGear: newGearInList[0]
    });
}

module.exports.postAddPedalboardToList = async (req, res) => {
    const addPedalboardToListResult = await Pedalboard.addToList(req.params.id, req.params.pedalboardId);

    const newPedalboardInList = await Pedalboard.getById(req.params.pedalboardId)

    res.json({
        listPedalboard: addPedalboardToListResult[0],
        newPedalboard: newPedalboardInList[0]
    });
}

module.exports.deleteGearFromList = async (req, res) => {

    const deleteGearFromListResult = await Gear.removeFromList(req.params.id, req.params.gearId);

    const deletedGear = await Gear.getById(req.params.gearId)

    res.json({
        listGear: deleteGearFromListResult[0],
        deletedGear: deletedGear[0]
    });
}

module.exports.deletePedalboardFromList = async (req, res) => {

    const deletePedalboardFromListResult = await Pedalboard.removeFromList(req.params.id, req.params.pedalboardId);

    const deletedPedalboard = await Pedalboard.getById(req.params.pedalboardId)

    res.json({
        listPedalboard: deletePedalboardFromListResult[0],
        deletedPedalboard: deletedPedalboard[0]
    });
}