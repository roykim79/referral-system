const passport = require('passport')
const GoogleStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

// --------------------- Testing purposes, will remove when feature implemented --------------- //
// passport.deserializeUser((id, done) => {
//   console.log(id)
//   done(null, id)
// })

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use('login', new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username/password.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect username/password.' });
      }
      return done(null, user);
    });
  }
));
