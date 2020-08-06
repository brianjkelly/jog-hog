const express = require('express');
const router = express.Router();
const daysCtrl = require('../controllers/days');

router.get('/plans/:id/days/new', isLoggedIn, daysCtrl.new);
router.post('/plans/:id/days', isLoggedIn, daysCtrl.create);
router.delete('/days/:id', isLoggedIn, daysCtrl.delete);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;