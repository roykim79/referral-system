const passport = require('passport');
const User = require('../models/User');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
 // create user
  app.post('/api/create_user', (request, response) => {
    if(request.body && request.body.password) {
      let user = new User({
        username: request.body.username,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        organization: request.body.organization
      })

      user.setPassword(request.body.password);

      user.save((err)=>{
          if(err) throw err;
      });

      return response.send(user);
    } else {
        return response.status(400).send("Unable to create user, please check if the required info is entered.")
    }
  })

  // Update user profile.
  app.put('/api/update_user', requireLogin , (request, response) => {
    if(request.body){    
        request.body.map(key => {
            if(request.user.hasOwnProperty(key)){
                request.user[key] = key.value
            }
        })
        return response.send(request.user);
    } else {
        return response.status(400).send('Nothing to be updated');
    }
  })
}