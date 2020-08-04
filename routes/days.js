const express = require('express');
const router = express.Router();
const daysCtrl = require('../controllers/days');

router.get('/plans/:id/days/new', daysCtrl.new);
router.post('/plans/:id/days', daysCtrl.create);

module.exports = router;