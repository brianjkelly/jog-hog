const express = require('express');
const router = express.Router();
const journalsCtrl = require('../controllers/journals');

router.get('/new', journalsCtrl.new);
router.post('/', journalsCtrl.create);
router.get('/', journalsCtrl.index)

module.exports = router;