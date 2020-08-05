const Plan = require('../models/plan');
const Journal = require('../models/journal');

module.exports = {
    new: newJournal,
    create,
    index
};

function newJournal(req, res) {
    Plan.find({}, function(err, plans) {
        res.render('journals/new', { 
            title: 'Create Journal', 
            plans 
        }); 
    });
};

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    };
    const journal = new Journal(req.body);
    journal.save(function(err) {
        if (err) return res.render('journals/new');
        res.redirect('/journals');
    });
};

function index(req, res) {
    Journal.find({}, function(err, journals) {
        res.render('journals/index', {
            title: 'All Journals',
            journals
        });
    });
};