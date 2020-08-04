const Plan = require('../models/plan');

module.exports = {
    new: newDay,
    create
};

function newDay(req, res) {
    res.render('days/new', {
        title: 'Create a Day for Plan',
        planId: req.params.id
    });
};

function create(req, res) {
    req.body.plan = req.params.id
    Plan.findById(req.params.id, function(err, plan) {
        plan.days.push(req.body);
        plan.save(function(err) {
            res.redirect(`/plans/${plan._id}`);
        });
    });
};