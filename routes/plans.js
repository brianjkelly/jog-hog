const express = require('express');
const router = express.Router();
const plansCtrl = require('../controllers/plans');


router.get('/new', plansCtrl.new);
router.post('/', plansCtrl.create);
router.get('/', plansCtrl.index);
router.get('/:id', plansCtrl.show);
router.get('/:id/edit', plansCtrl.edit);
router.put('/:id', plansCtrl.update);
router.delete('/:id', plansCtrl.delete);

module.exports = router;