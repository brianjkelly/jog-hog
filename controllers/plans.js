const Plan = require('../models/plan');
const Runner = require('../models/runner');

module.exports = {
    new: newPlan,
    create,
    index,
    show,
    edit,
    update,
    delete: deletePlan
};

function newPlan(req, res) {
    res.render('plans/new', { 
        title: 'Create Plan',
        user: req.user
    });
};

function create(req, res) {
    // delete body of empty strings to push defaults
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    };
    Runner.findById(req.user._id, function (err, user) {
        req.body.runner = user;
        const plan = new Plan(req.body);
        plan.save(function(err) {
            if (err) return res.render('plans/new');
            res.redirect('/plans');
        });
    });
};

function index(req, res) {
    Plan.find({})
    .populate('runner')
    .exec(function(err, plans) {
        res.render('plans/index', {
            title: 'All Plans',
            plans,
            user: req.user
        });
    });
};

function show(req, res) {
    Plan.findById(req.params.id) 
    .populate('runner')
    .exec(function(err, plan) {
        res.render('plans/show', {
            title: 'Plan Details',
            plan,
            runner: plan.runner,
            user: req.user
        });
    });
};

function edit(req, res) {
    Plan.findById(req.params.id, function(err, plan) {
        res.render('plans/edit', {
            title: 'Edit Plan',
            plan,
            user: req.user
        });
    });
};

function update(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    };
    Plan.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new: true}
    ).then(function(plan) {
            res.redirect('/plans');
    }).catch(function(err) {
        res.redirect(`/plans/${req.params.id}/edit`);
    });
};

function deletePlan(req, res) {
    Plan.findByIdAndDelete(req.params.id, function(err, plan) {
        res.redirect('/plans');
    });
};