const passport = require('passport')

module.exports = app => {
  app.post('/api/login', passport.authenticate('login', {
    successRedirect: '/dashboard',
    failureRedirect: '/landing'
  }));

  app.post('/api/create_user')
}

