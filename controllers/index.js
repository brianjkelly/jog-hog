const runner = require("../models/runner");

module.exports = {
    index
};

// function index(req, res) {
//     res.render('index');
// }
function index(req, res) {
    Runner.find({}, function(err, runners) {
    res.render('index', {
        runners,
        user: req.user
    });
    });
}