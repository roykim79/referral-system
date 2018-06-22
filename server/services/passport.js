const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
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

module.exports = app => {
    
    // POST /login, if success redirect to /dashboard, if failed redirect to /landing
    app.post('api/login', passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/landing' }));

    
}
