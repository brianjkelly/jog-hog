const express = require('express');
const router = express.Router();
const entriesCtrl = require('../controllers/entries');

router.get('/journals/:id/entries/new', isLoggedIn, entriesCtrl.new);
router.post('/journals/:id/entries', isLoggedIn, entriesCtrl.create);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;