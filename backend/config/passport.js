const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
require('dotenv').config();

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

/*module.exports = (passport) => {
  passport.use(
    new JwtStrategy(jwtOpts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.error(err));
    })
  );*/

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  }, (token, tokenSecret, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then(user => {
        if (user) {
          return done(null, user);
        } else {
          const newUser = new User({
            googleId: profile.id,
            nom: profile.name.familyName,
            prenom: profile.name.givenName,
            email: profile.emails[0].value,
            role: 'client'
          });
          newUser.save()
            .then(user => done(null, user))
            .catch(err => console.error(err));
        }
      })
      .catch(err => console.error(err));
  }));


