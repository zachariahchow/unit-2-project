const db = require('../db');
const Gear = require('../models/gear-model');

module.exports.getAllGear = async (req, res) => {

    const allGearResult = await Gear.getAll(req.session.userId)

    console.log(allGearResult)

    res.render('./gear/gear-all', { allGear: allGearResult });
}

module.exports.getGearById = async (req, res) => {

    const getGearResult = await Gear.getById(req.params.id);

    console.log(getGearResult);

    res.render('./gear/gear-single', { singleGear: getGearResult[0] });
}

//Consider turning these into AJAX calls to internalAPI endpoints, manipulate DOM rather than render new page
module.exports.postAddGear = async (req, res) => {

    const newGear = new Gear(
        req.session.userId,
        req.body.name,
        req.body.type,
        req.body.img,
        req.body.notes);

    const addGearResult = await newGear.add();

    res.json(addGearResult);
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

//API endpoints for gear-all//

module.exports.getGearByType = async (req, res) => {

    const getGearTypeResult = await Gear.getByType(req.session.userId, req.params.type);

    res.json(getGearTypeResult);
}