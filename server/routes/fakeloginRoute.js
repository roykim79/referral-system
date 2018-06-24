const passport = require('passport');
const Organizations = require('../models/Organization');
const Users = require('../models/User');
const Tags = require('../models/Tags');
const mongoose = require('mongoose')

module.exports = app => {
    // create fake org and admin user
    app.get('/api/fake-data', (request, response) => {
        Users.collection.drop();
        Organizations.collection.drop();
        Tags.collection.drop();

        let tagsArray = ["School", "Code", "Javascript"];
        let tagIds = [];

        tagsArray.forEach(tag => {
            let newTag = new Tags({
                name: tag
            })
            newTag.save()
            tagIds.push(newTag.id);
        })

        let newOrganization = new Organizations({
            organizationName: 'TestOrganization',
            description: "Cohort 2 Rocks",
            website: "projectShift.io",
            email: "aaron@projectshift.io",
            phone: "(919)123-4567",
            address: "112 broad way st",
            tags: tagIds
        })

        let user = new Users({
            username: "adminUser",
            firstName: "Aaron",
            lastName: "Hayslip",
            email: "aaron@projectshift.io",
            organization: newOrganization.id,
            status: "success",
            role: "admin"        
        })

        newOrganization.admins.push(user.id);
    
        user.setPassword("password");
    
        user.save((err)=>{
            if(err) throw err;
        });

        newOrganization.save((err) => {
            if (err) throw err
        })  

        response.send({newOrganization, user}) 
    })
}