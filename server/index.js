const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const bodyParser = require('body-parser');
const cors = require("cors");

require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express()
app.use(cors());
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// ------ fake data generator, only works in dev mode ----- //
// if (process.env.NODE_ENV !== 'production'){
  require('./routes/fakeLoginRoute')(app);
  require('./routes/fakeReferralsRoute')(app);
// }

require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/organizationRoutes')(app);
require('./routes/tagRoutes')(app);
require('./routes/referralRoutes')(app);

const PORT = process.env.PORT || 5000
app.listen(PORT);
console.log(`Server running, listening to port ${PORT}`)
