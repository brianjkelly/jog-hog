// Require modules
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const port = 3000;

const indexRouter = require('./routes/index');
const plansRouter = require('./routes/plans');
const daysRouter = require('./routes/days');
const journalsRouter = require('./routes/journals');
const entriesRouter = require('./routes/entries');

// Load the env vars
require('dotenv').config()

// Set up express app
const app = express();

// Connect to DB
require('./config/database');
require('./config/passport');

// Configure the app with app.set()
app.set('view engine', 'ejs');

// Mount middleware with app.use()
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'Born2Run!',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Mount routes with app.use()
app.use('/', indexRouter);
app.use('/plans', plansRouter);
app.use('/', daysRouter);
app.use('/journals', journalsRouter);
app.use('/', entriesRouter);

// Tell App to listen
app.listen(port, function() {
    console.log(`Express is listening on port:${port}`);
});