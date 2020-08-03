const Plan = require('../models/plan');

module.exports = {
    new: newPlan,
    create
};

function newPlan(req, res) {
    res.render('plans/new');
};

function create(req, res) {
    const plan = new Plan(req.body);
    plan.save(function(err) {
        if (err) return res.render('plans/new');
        console.log(plan);
        res.redirect('/plans/new');
    });
}