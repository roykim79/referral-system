const passport = require('passport')
const User = require('../models/User')

module.exports = app => {
  // if login success redirect to /dashboard, if fail redirect to /landing
  app.post('/api/login', passport.authenticate('login', {
    successRedirect: '/dashboard',
    failureRedirect: '/landing'
  }));

  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })


}

