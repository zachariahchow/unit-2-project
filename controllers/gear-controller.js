const db = require('../db');
const Gear = require('../models/gear-model');
const errorController = require('../controllers/404-controller');

module.exports.getAllGear = async (req, res) => {

    const allGearResult = await Gear.getAll(req.session.userId)

    res.render('./gear/gear-all', {
        allGear: allGearResult,
        currentUser: req.session.currentUser
    });
}

module.exports.getGearById = async (req, res) => {

    try {

        const getGearResult = await Gear.getById(req.params.id);

        console.log(getGearResult);

        if (!getGearResult[0]) {

            errorController.get404Page(req, res);
            console.log('Cannot find Gear item');

        } else {
            res.render('./gear/gear-single', {
                singleGear: getGearResult[0],
                currentUser: req.session.currentUser
            });
        }

    } catch (err) {
        console.log(err);
        errorController.get404Page(req, res);
    }

}

//Consider turning these into AJAX calls to internalAPI endpoints, manipulate DOM rather than render new page
module.exports.postAddGear = async (req, res) => {

    const newGear = new Gear(
        req.session.userId,
        req.body.name,
        req.body.type,
        req.body.img,
        req.body.notes);

    if (!newGear.name)
        newGear.name = 'Unnamed Item (Tap to Edit)';

    if (!newGear.img)
        newGear.img = './images/gearlog.svg';

    const addGearResult = await newGear.add();

    res.json(addGearResult);
}

module.exports.putEditGearById = async (req, res) => {

    const editGearResult = await Gear.updateById(
        req.params.id,
        req.body.name,
        req.body.type,
        req.body.img,
        req.body.notes);

    res.send(editGearResult);
}

module.exports.deleteGearById = async (req, res) => {

    const deleteGearResult = await Gear.deleteById(req.params.id);

    res.json(deleteGearResult);

}
//

//API endpoints for gear-all//

module.exports.getGearByType = async (req, res) => {

    const getGearTypeResult = await Gear.getByType(req.session.userId, req.params.type);

    res.json(getGearTypeResult);
}

module.exports.putEditGearNameById = async (req, res) => {

    const editGearResult = await Gear.updateSingleFieldById(req.params.id, 'name', req.body.field)

    console.log(req.body.field);

    res.json(editGearResult);
}

module.exports.putEditGearTypeById = async (req, res) => {

    const editGearResult = await Gear.updateSingleFieldById(req.params.id, 'type', req.body.field)

    res.json(editGearResult);
}

module.exports.putEditGearImgLinkById = async (req, res) => {

    const editGearResult = await Gear.updateSingleFieldById(req.params.id, 'img_link', req.body.field)

    res.json(editGearResult);
}