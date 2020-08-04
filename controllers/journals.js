const Plan = require('../models/plan');
const Journal = require('../models/journal');

module.exports = {
    new: newJournal
};

function newJournal(req, res) {
    Plan.find({}, function(err, plans) {
        res.render('journals/new', { title: 'Create Journal', plans }) 
    });
};