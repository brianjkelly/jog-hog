const Journal = require('../models/journal');

module.exports = {
    new: newEntry,
    create,
    delete: deleteEntry
};

function newEntry(req, res) {
    res.render('entries/new', {
        title: 'Create a New Entry for Journal',
        journalId: req.params.id
    });
};

function create(req, res) {
    req.body.journal = req.params.id
    req.body.actTime = Math.floor((Number(req.body.minutes) * 60) + Number(req.body.seconds));
    console.log(req.body.actTime);
    delete req.body.minutes;
    delete req.body.seconds;
    Journal.findById(req.params.id, function(err, journal) {
        journal.entries.push(req.body);
        journal.save(function(err) {
            console.log(err);
            res.redirect(`/journals/${journal._id}`)
        });
    });
};

function deleteEntry(req, res) {
    Journal.findOne({ "entries._id": req.params.id }, function(err, journal) {
        journal.entries.pull(req.params.id);
        journal.save(function(err) {
            res.redirect(`/journals/${journal._id}`)
        });
    });
}