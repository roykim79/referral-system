const passport = require('passport');
const Organization = require('../models/Organization');
const User = require('../models/User');

module.exports = app => {
    // create fake org and admin user
    app.get('/api/fake-data', (request, response) => {
            let newOrganization = new Organization({
                organizationName: 'TestOrganization',
                description: "Cohort 2 Rocks",
                website: "projectShift.io",
                email: "aaron@projectshift.io",
                phone: "(919)123-4567",
                address: "112 broad way st",
                tags: ["School", "Code", "Javascript"]
            })

            let user = new User({
                username: "adminUser",
                firstName: "Aaron",
                lastName: "Hayslip",
                email: "aaron@projectshift.io",
                organization: newOrganization.id,
                status: "success",
                role: "admin"        
            })

            newOrganization.members.push(user.id);
        
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