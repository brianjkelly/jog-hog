const Plan = require('../models/plan');
const Journal = require('../models/journal');
const Runner = require('../models/runner');
const moment = require('moment');


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
            plans,
            user: req.user 
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
    Journal.find({})
    .populate('runner')
    .exec(function(err, journals) {
        res.render('journals/index', {
            title: 'All Journals',
            journals,
            user: req.user
        });
    });
}

function show(req, res) {
    Journal.findById(req.params.id)
    .populate('plan').populate('runner')
    .exec(function(err, journal) {
        // create variable that contains string of display time
        // let displayTime = formatDisplayTime(journal.entries.actTime);
        journal.entries.forEach(function(e) {
            e.actTime = formatDisplayTime(e.actTime)
        });
        res.render('journals/show', {
            title: 'Journal Details',
            journal,
            plan: journal.plan,
            runner: journal.runner,
            user: req.user,
            moment
        });
    });
}

function edit(req, res) {
    Journal.findById(req.params.id, function(err, journal) {
            res.render('journals/edit', {
                title: 'Edit Journal',
                journal,
                user: req.user
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