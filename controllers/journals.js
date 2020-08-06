const Plan = require('../models/plan');
const Journal = require('../models/journal');
const Runner = require('../models/runner');
const e = require('express');

module.exports = {
    new: newJournal,
    create,
    index,
    show,
    edit,
    update,
    delete: deleteJournal
}

function newJournal(req, res) {
    Plan.find({}, function(err, plans) {
        res.render('journals/new', { 
            title: 'Create Journal', 
            plans 
        }); 
    });
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    };
    Runner.findById(req.user._id, function (err, user) {
        req.body.runner = user;
        const journal = new Journal(req.body);
        journal.save(function(err) {
            if (err) return res.render('journals/new');
            res.redirect('/journals');
        });
    });
}

function index(req, res) {
    Journal.find({}, function(err, journals) {
        res.render('journals/index', {
            title: 'All Journals',
            journals
        });
    });
}

function show(req, res) {
    Journal.findById(req.params.id)
    .populate('plan')
    .exec(function(err, journal) {
        // create variable that contains string of display time
        let displayTime = formatDisplayTime(journal.entries.actTime);
        console.log(displayTime);
        res.render('journals/show', {
            title: 'Journal Details',
            journal,
            plan: journal.plan,
            // pass string variable into render
            displayTime

        });
    });
}

function edit(req, res) {
    Journal.findById(req.params.id, function(err, journal) {
            res.render('journals/edit', {
                title: 'Edit Journal',
                journal
        });
    });
}

function update(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    };
    Journal.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new: true}
    ).then(function(journal) {
            res.redirect('/journals');
    }).catch(function(err) {
        res.redirect(`/journals/${req.params.id}/edit`);
    });
}

function deleteJournal(req, res) {
    Journal.findByIdAndDelete(req.params.id, function(err, plan) {
        res.redirect('/journals');
    });
}

// Create a function that takes in total seconds and returns a time string
function formatDisplayTime(seconds) {
    let mins = Math.floor(seconds / 60).toString().padStart(3, '0');
    let secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
};