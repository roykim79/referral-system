const passport = require('passport');
const Organization = require('../models/Organization');
const User = require('../models/User');
const Tags = require('../models/Tags');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.get('/api/tags', (request, response) => {
        Tags.find({}).exec((err, results) => {
            let customTagArray = [];
            results.forEach(result => {
                let tag = {
                    text: result.text,
                    id : result.text
                }
                customTagArray.push(tag);
            })
            response.send(customTagArray);
        })
    })
}