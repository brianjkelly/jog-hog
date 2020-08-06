const express = require('express');
const router = express.Router();
const journalsCtrl = require('../controllers/journals');

router.get('/new', isLoggedIn, journalsCtrl.new);
router.post('/', isLoggedIn, journalsCtrl.create);
router.get('/', journalsCtrl.index)
router.get('/:id', journalsCtrl.show);
router.get('/:id/edit', isLoggedIn, journalsCtrl.edit);
router.put('/:id', isLoggedIn, journalsCtrl.update);
router.delete('/:id', isLoggedIn, journalsCtrl.delete);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;