const express = require('express');
const router = express.Router();
const plansCtrl = require('../controllers/plans');


router.get('/new', plansCtrl.new);
router.post('/', plansCtrl.create);

module.exports = router;