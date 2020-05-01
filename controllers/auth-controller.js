const db = require('../db.js');
const sha256 = require('js-sha256');
const User = require('../models/users-model.js');


module.exports.getAuthIndex = async (req, res) => {

    req.session.invalidMsg = "";

    res.render('./auth/index');

}

module.exports.getLogin = async (req, res) => {

    res.render('./auth/login', { invalidMsg: req.session.invalidMsg });

}

module.exports.getRegister = async (req, res) => {

    res.render('./auth/register', { invalidMsg: req.session.invalidMsg });

}

module.exports.postLogin = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        req.session.invalidMsg = 'Please enter user email and password';

        res.redirect('./login');

    } else {

        const loggedInUser = await User.getByEmail(email)

        console.log(`Logged in User:\n${loggedInUser.email}`);

        if (!loggedInUser[0]) {

            req.session.invalidMsg = 'Email is not registered';

            res.redirect('./login');

        } else if (loggedInUser[0].password !== sha256(password)) {

            req.session.invalidMsg = 'Wrong password';

            res.redirect('./login');

        } else if (loggedInUser[0]['email'] == email && loggedInUser[0]['password'] == sha256(password)) {

            req.session.user = loggedInUser[0];
            console.log(loggedInUser);
            req.session.userId = loggedInUser[0].id;
            req.session.invalidMsg = "";
            res.redirect('/');
        }
    }
}

module.exports.postRegister = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        req.session.invalidMsg = 'Please enter your email and password';

        res.redirect('./register');
    }

    const users = await User.getAll();

    if (email && password) {
        const userExists = users.some(
            usr => usr['email'] == email
        )

        if (!userExists) {
            const newUser = new User(email, sha256(password));

            await User.register(newUser);

            const rows = await User.getByEmail(newUser.email);
            console.log(rows);
            newlyRegUserId = rows[0].id

            req.session.userId = newlyRegUserId;

            res.redirect('/');

        } else {

            req.session.invalidMsg = 'User already exists. Please Login.';

            res.redirect('./login');

        }
    }

}

module.exports.postLogout = async (req, res) => {

    req.session.destroy();
    res.clearCookie('sid');
    res.redirect('/');

}

module.exports.getUserInfo = async (userId) => {

    const rows = await User.getById(userId)

    console.log(`Currently Logged In as ${rows[0].email}`)

    return rows[0];
}