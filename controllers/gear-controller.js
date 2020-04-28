const db = require('../db');
const Gear = require('../models/gear-model');

module.exports.getAllGear = async (req, res) => {

    const allGearResult = await Gear.getAll(req.session.userId)

    console.log(allGearResult)

    res.send(allGearResult);
}

module.exports.getGearById = async (req, res) => {

    const getGearResult = await Gear.getById(req.params.id);

    res.send(getGearResult);
}

//Consider turning these into AJAX calls to internalAPI endpoints, manipulate DOM rather than render new page
module.exports.postAddGear = async (req, res) => {

    newGear = new Gear(
        req.session.userId,
        req.body.name,
        req.body.type,
        req.body.img,
        req.body.notes);

    const addGearResult = await newGear.add();

    res.send(addGearResult);
}

module.exports.putEditGearById = async (req, res) => {

    const editGearResult = Gear.updateById(
        req.params.id,
        req.body.name,
        req.body.type,
        req.body.img,
        req.body.notes);

    res.send(editGearResult);
}

module.exports.deleteGearById = async (req, res) => {

    const deleteGearResult = await Gear.deleteById(req.params.id);

    res.send(deleteGearResult);

}
//