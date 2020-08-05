const Plan = require('../models/plan');

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
    res.render('plans/new', { title: 'Create Plan' });
};

function create(req, res) {
    // delete body of empty strings to push defaults
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    };
    const plan = new Plan(req.body);
    plan.save(function(err) {
        if (err) return res.render('plans/new');
        res.redirect('/plans');
    });
};

function index(req, res) {
    Plan.find({}, function(err, plans) {
        res.render('plans/index', {
            title: 'All Plans',
            plans
        });
    });
};

function show(req, res) {
    Plan.findById(req.params.id, function(err, plan) {
        res.render('plans/show', {
            title: 'Plan Details',
            plan
        });
    });
};

function edit(req, res) {
    Plan.findById(req.params.id, function(err, plan) {
        res.render('plans/edit', {
            title: 'Edit Plan',
            plan
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