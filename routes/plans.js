const express = require('express');
const router = express.Router();
const plansCtrl = require('../controllers/plans');


router.get('/new', isLoggedIn, plansCtrl.new);
router.post('/', isLoggedIn, plansCtrl.create);
router.get('/', plansCtrl.index);
router.get('/:id', plansCtrl.show);
router.get('/:id/edit', isLoggedIn, plansCtrl.edit);
router.put('/:id', isLoggedIn, plansCtrl.update);
router.delete('/:id', isLoggedIn, plansCtrl.delete);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;