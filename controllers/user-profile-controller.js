const db = require('../db');
const User = require('../models/users-model');
const sha256 = require('js-sha256');

module.exports.getCurrentUser = async (req, res) => {

    const getUserResult = await User.getById(req.session.userId);

    res.json(getUserResult);
}

module.exports.putEditUserNameById = async (req, res) => {

    const editUserResult = await User.updateFieldById(req.session.userId, 'name', req.body.field)

    res.json(editUserResult);
}

module.exports.putEditUserImgLinkById = async (req, res) => {

    const editUserResult = await User.updateFieldById(req.session.userId, 'img_link', req.body.field)

    res.json(editUserResult);
}

module.exports.putEditUserEmailById = async (req, res) => {

    const editUserResult = await User.updateFieldById(req.params.id, 'email', req.body.field)

    res.json(editUserResult);
}

module.exports.putEditUserPasswordById = async (req, res) => {

    const editUserResult = await User.updateSingleFieldById(req.params.id, 'password', sha256(req.body.field));

    res.json(editUserResult);
}