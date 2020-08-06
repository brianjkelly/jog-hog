const Plan = require('../models/plan');
const Journal = require('../models/journal');
const Runner = require("../models/runner");

module.exports = {
    index
}

function index(req, res) {
    Runner.findById(req.user._id, function(err, runner) {
        Journal.find({runner: runner._id}, function(err, journals) {
            Plan.find({runner: runner._id}, function(err, plans) {
                res.render('dashboard/index', {
                title: `${runner.name}'s Dashboard`,
                runner,
                journals,
                plans,
                user: req.user
                });
            });
        });
    });
}