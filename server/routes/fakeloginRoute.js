const passport = require('passport');
const Organizations = require('../models/Organization');
const Users = require('../models/User');
const Tags = require('../models/Tags');
const mongoose = require('mongoose');

module.exports = app => {
    // create fake org and admin user
    app.get('/api/fake-data', (request, response) => {
        Users.collection.drop();
        Organizations.collection.drop();
        Tags.collection.drop();
        

        let tagsArray = ["School", "Code", "Javascript"];
        let organizationNamesArray = ["OrganizationA","OrganizationB","OrganizationC"];
        let userNameArray = ["userA", "userB", "userC"];
        let tagIds = [];
        let sampleOrg;
        let sampleUser;

        tagsArray.forEach(tag => {
            let newTag = new Tags({
                text: tag,
                id: tag
            })
            newTag.save()
            tagIds.push(newTag.id);
        })

        for(i = 0; i < 3; i++){
            let newOrganization = new Organizations({
                organizationName: organizationNamesArray[i],
                description: "Cohort 2 Rocks",
                website: "projectShift.io",
                email: "aaron@projectshift.io",
                phone: "(919)123-4567",
                address: "112 broad way st",
                tags: tagIds,
                logo: "https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250"
            })
    
            let user = new Users({
                username: userNameArray[i],
                firstName: "Aaron",
                lastName: "Hayslip",
                email: "aaron@projectshift.io",
                organization: newOrganization.id,
                phone: "(919)123-4567"   
            })
    
            newOrganization.members.push(user.id);
        
            user.setPassword("password");
        
            user.save((err)=>{
                if(err) throw err;
            });
    
            newOrganization.save((err) => {
                if (err) throw err
            }) 

            if(i == 2){
                sampleOrg = newOrganization;
                sampleUser = user;
            }
        }
         

        response.send({
            Tags: tagsArray,
            Organizations: organizationNamesArray,
            Usernames: userNameArray,
            Password: "password",
            sampleOrganization: sampleOrg, 
            sampleUser: sampleUser})
    })
}