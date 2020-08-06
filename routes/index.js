const express = require('express');
const router = express.Router();
const passport = require('passport');
const indexCtrl = require('../controllers/index');


// router.get('/', indexCtrl.index);
router.get('/', function(req, res) {
    res.render('index', {
        user: req.user
    });
});
// Google OAuth login route
router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
));
// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        // send user to dashboard on successful login
        successRedirect : '/dashboard',
        failureRedirect : '/'
    }
));
// OAuth logout route
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;