const Journal = require('../models/journal');

module.exports = {
    new: newEntry
};

function newEntry(req, res) {
    res.render('entries/new', {
        title: 'Create a New Entry for Journal',
        journalId: req.params.id
    });
};