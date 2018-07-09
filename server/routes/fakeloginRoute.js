const passport = require('passport');
const Organizations = require('../models/Organization');
const Users = require('../models/User');
const Tags = require('../models/Tags');
const mongoose = require('mongoose');
const faker = require('faker');

module.exports = app => {
    // create fake org and admin user
    app.get('/api/fake-data', (request, response) => {
        Users.collection.drop();
        Organizations.collection.drop();
        Tags.collection.drop();
        
        let tagsArray = [];
        let organizationNamesArray = [];
        let userNameArray = ["userA", "userB", "userC"];
        let nameArray = []
        let tagArrayIds = [];
        let sampleOrg;
        let sampleUser;

        for(let a = 0; a < 20; a++ ) {
            let newArray = [];
            for(let x = 0; x < 3; x++) {
                let tagName = faker.company.catchPhraseNoun();
                newArray.push(tagName)
            }
            tagsArray.push(newArray);
        }

        for(let b = 0; b < 20; b++){
            let companyName = faker.company.companyName()
            organizationNamesArray.push(companyName)
        }
        for(let c = 0; c < 20; c++) {
            let name = faker.name.firstName()
            nameArray.push(name)
        }

        for(let d = 0; d < 20; d++) {
            userNameArray.push(`user${d}`)
        }

        tagsArray.forEach(tagArray => {
            let tagArrayId = [];
            tagArray.forEach(tag => {
                let newTag = new Tags({
                    text: tag
                })
                newTag.save()
                tagArrayId.push(newTag.id);
            })
            tagArrayIds.push(tagArrayId)
        })

        for(let i = 0; i < 20; i++){
            let newOrganization = new Organizations({
                organizationName: organizationNamesArray[i],
                description: "Cohort 2 Rocks",
                website: "projectShift.io",
                email: "aaron@projectshift.io",
                phone: "(919)123-4567",
                address: "112 broad way st",
                tags: tagArrayIds[i],
                logo: "https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250"
            })

            let user = new Users({
                username: userNameArray[i],
                firstName: nameArray[i],
                lastName: "Shift",
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