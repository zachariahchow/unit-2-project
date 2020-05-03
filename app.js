const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const db = require('./db');
const path = require('path');
const csrf = require('csurf');
require('dotenv').config();

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set up middleware
app.use(methodOverride('_method'));

app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, './public/')));

//Experimenting with helmet
const helmet = require('helmet');
app.use(helmet.hidePoweredBy());
//

const compression = require('compression');
app.use(compression());

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

// Set session and authentication routes. User remains on auth routes until validated/logged in.
app.use(session({
    store: new pgSession({
        pool: db.pool,
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'sid',
    cookie: {
        maxAge: 86400000,
        sameSite: true
    }
}))

const csrfProtection = csrf();
app.use(csrfProtection);

const authRoutes = require('./routes/auth-routes');
const authController = require('./controllers/auth-controller');
const errorController = require('./controllers/404-controller');
const gearRoutes = require('./routes/gear-routes');
const listsRoutes = require('./routes/lists-routes');
const pedalboardsRoutes = require('./routes/pedalboards-routes');
const userProfileRoutes = require('./routes/user-profile-routes');
const userFeedRoutes = require('./routes/user-feed-routes');

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use('/auth', authRoutes);

app.use('/', async (req, res, next) => {

    req.session.invalidMsg = "";

    if (req.session.userId) {

        req.session.currentUser = await authController.getUserInfo(req.session.userId);
        next();

    } else {

        //redirect to homepage with auth routes if user is not logged in

        res.redirect('/auth');

    }
})

app.get('/', async (req, res) => {

    if (req.session.userId) {

        req.session.currentUser = await authController.getUserInfo(req.session.userId);
        console.log(req.session.currentUser);
        res.render('home', { 'currentUser': req.session.currentUser });

    }
})

app.use('/gear', gearRoutes);

app.use('/lists', listsRoutes);

app.use('/pedalboards', pedalboardsRoutes);

app.use('/user-profile', userProfileRoutes);

app.use('/user-feed', userFeedRoutes);

app.use(errorController.get404Page);


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port ' + PORT + ' ~~~'));

let onClose = function() {

    server.close(async () => {
        await db.poolEnd();
        console.log('Process terminated')
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);