const Runner = require("../models/runner");

module.exports = {
    index
};

function index(req, res) {
    Runner.find({}, function(err, runners) {
    res.render('index', {
        runners,
        user: req.user
    });
    });
}