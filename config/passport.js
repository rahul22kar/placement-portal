const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Authentication = mongoose.model('authentication');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        if(jwt_payload.role && jwt_payload.role === 'admin') {
            return done(null, {role: 'admin'})
        }
        else {
            Authentication.findOne({email: jwt_payload.email})
                .then(doc => {
                    if (doc) {
                        return done(null, doc);
                    }
                    return done(null, false);
                })
                .catch(err => {
                    const jwtError = {
                      token: 'Unauthorized Route Access'
                    };
                    return done(jwtError, false);
                });
        }
    }));
};
