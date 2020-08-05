const express = require('express');
const router = express.Router();
const entriesCtrl = require('../controllers/entries');

router.get('/journals/:id/entries/new', entriesCtrl.new);
router.post('/journals/:id/entries', entriesCtrl.create);

module.exports = router;