const passport = require('passport');
const Organizations = require('../models/Organization');
const Users = require('../models/User');
const Referrals = require('../models/referral');
const mongoose = require('mongoose');

module.exports = app => {
    // create fake referrals
    app.get('/api/fake-referrals', (request, response) => {
        Referrals.collection.drop();

        let organizationNames = ["OrganizationA","OrganizationB","OrganizationC"];
        let user = ["userA","userB","userC"];
        let client = ["Roy", "Jeff", "Ilona"];
        let organizationIds = [];
        let userIds = [];

        organizationNames.forEach(organization => {
            Organizations.find({organizationName: organization}).exec((err, result) => {
                
            })
        })

        return response.send(organizationIds);
    })
}