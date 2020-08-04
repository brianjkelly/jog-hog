const Plan = require('../models/plan');

module.exports = {
    new: newPlan,
    create,
    index,
    show
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
    // get all the run plans from the DB
    Plan.find({}, function(err, plans) {
        // ... render a template with plans data
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