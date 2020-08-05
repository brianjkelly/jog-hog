const Journal = require('../models/journal');

module.exports = {
    new: newEntry,
    create
};

function newEntry(req, res) {
    res.render('entries/new', {
        title: 'Create a New Entry for Journal',
        journalId: req.params.id
    });
};

function create(req, res) {
    req.body.journal = req.params.id
    Journal.findById(req.params.id, function(err, journal) {
        journal.entries.push(req.body);
        journal.save(function(err) {
            res.redirect(`/journals/${journal._id}`)
        });
    });
};