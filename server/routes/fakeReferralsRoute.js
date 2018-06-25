const passport = require('passport');
const Organizations = require('../models/Organization');
const Users = require('../models/User');
const Referrals = require('../models/referral');
const mongoose = require('mongoose');

module.exports = app => {
    // create fake referrals
    app.get('/api/fake-referrals', async (request, response) => {
        // Referrals.collection.drop();

        let organizationNames = ["organizationa","organizationb","organizationc"];
        let usernames = ["userA","userB","userC"];
        let clientNames = ["Roy", "Jeff", "Ilona"];

        let organizationObject = await Promise.all(organizationNames.map( organization => {
            return Organizations.findOne({organizationName: organization}).then(result => {
                if(result){
                    return result
                } 
            })
        }));

        let userObject = await Promise.all(usernames.map( user => {
            return Users.findOne({username: user}).then(result => {
                if(result){
                    return result
                } 
            })
        }));

        


        return response.send(userIds);
    })
}