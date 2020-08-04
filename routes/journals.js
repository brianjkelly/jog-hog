const express = require('express');
const router = express.Router();
const journalsCtrl = require('../controllers/journals');

router.get('/new', journalsCtrl.new);

module.exports = router;