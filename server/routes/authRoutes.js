const passport = require('passport')
const User = require('../models/User')

module.exports = app => {
  // if login success redirect to /dashboard, if fail redirect to /landing
  app.post('/api/login', passport.authenticate('login', { session: true }),
    function(req, res) {
      res.json({ id: req.user.id, username: req.user.username });
  });


  // just to check if cookie is working.
  app.get('/api/current_user', (req, res) => {
    res.send(req.user.id)
  })

  // log out request, nullify cookie session, requires user to present credential next time.
  app.get('/api/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
  });

}

