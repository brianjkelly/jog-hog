const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Runner = require('../models/runner');
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
},
function(accessToken, refreshToken, profile, cb) {
    Runner.findOne({ 'googleId': profile.id }, function(err, runner) {
        if (err) return cb(err);
        if (runner) {
            return cb(null, runner);
        } else {
            // we have a new runner via OAuth!
            const newRunner = new Runner({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            });
            newRunner.save(function(err) {
                if (err) return cb(err);
                return cb(null, newRunner);
            });
        }
    });
}
));

passport.serializeUser(function(runner, done) {
    done(null, runner.id);
});

passport.deserializeUser(function(id, done) {
    Runner.findById(id, function(err, runner) {
        done(err, runner);
    });
});