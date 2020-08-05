const express = require('express');
const router = express.Router();
const entriesCtrl = require('../controllers/entries');

router.get('/journals/:id/entries/new', entriesCtrl.new);

module.exports = router;