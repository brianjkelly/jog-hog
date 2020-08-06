const Runner = require("../models/runner");

module.exports = {
    index
};

function index(req, res) {
    Runner.find({}, function(err, runners) {
    res.render('index', {
        title: 'Welcome to JogHog!',
        runners,
        user: req.user
    });
    });
}