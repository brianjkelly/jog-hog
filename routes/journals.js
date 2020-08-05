const express = require('express');
const router = express.Router();
const journalsCtrl = require('../controllers/journals');

router.get('/new', journalsCtrl.new);
router.post('/', journalsCtrl.create);
router.get('/', journalsCtrl.index)
router.get('/:id', journalsCtrl.show);
router.get('/:id/edit', journalsCtrl.edit);
router.put('/:id', journalsCtrl.update);
router.delete('/:id', journalsCtrl.delete);

module.exports = router;