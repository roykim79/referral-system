const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

const app = express();

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',   //choose anyone between them
  
    // To create a pool of connections
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  
    // For SQLite only
    storage: 'path/to/database.sqlite'
  });

app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
    })
)
app.use(bodyParser.json());
app.use(passport.initialize())
app.use(passport.session())

const PORT = process.env.PORT || 5000
app.listen(PORT)


