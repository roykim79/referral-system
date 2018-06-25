const passport = require('passport');
const Organization = require('../models/Organization');
const User = require('../models/User');
const Tags = require('../models/Tags');
const requireLogin = require('../middlewares/requireLogin');
//for the tags. formatted into array of objects. {id:tag, text:tag}
//tags auto populate
//query database that are all unique
//get api/tags

module.exports = app => {
      
    // Takes in information from req.body and updates the organization info.
    app.put('/api/my_organization', requireLogin, (request, response) => {
        Organization.find({}).exec((error, organization) => {

            if (request.body) {
                request.body.map(key => {
                    if(request.organization.hasOwnProperty(key)) {
                        request.organization[key] = key.value
                    }
                })
                console.log(request.user)
                return response.send(request.user.organization);
            } else {
                return response.status(400).send('Nothing to be updated');
            }
        })
    })

    // get organization by user id
    app.get('/api/:user/organization', (request, response) => {
        User.findById({_id: request.params.user})
        .exec((error, user) => {
            if(error) {
                return response.status(400).send("The organization was not found");
            }
            response.send(user.organization)
        })
    })
    
    // gets all organizations and returns the organization name and id
    app.get('/api/organizations/all', (request, response) => {
        Organization.find({}, {organizationName: 1}, ).exec((error, organization) => {
            if (error) {
                return response.status(400).send("Organization not found, please try again");
            }
            response.send(organization)
        })
    })

    // First, it finds all the tags id, if doesnt exist, create new tags
    app.post('/api/create_org', requireLogin, async (request, response) => {
        if (request.body) {
            
            if(!Array.isArray(request.body.tags) && request.body.tags.length == 0 ) {
                return response.status(400).send("Tags not entered correctly.")
            }

            let tagList = await Promise.all(request.body.tags.map( tag => {
                return Tags.findOne({name: tag}).then(result => {
                    
                    if(result){
                        return result.id
                    } else {
                        let newTag = new Tags({
                            name: tag
                        })
                        newTag.save()
                        return newTag.id
                    }
                })
            }));

            let newOrganization = new Organization({
                organizationName: request.body.organizationName,
                description: request.body.description,
                website: request.body.website,
                email: request.body.organizationEmail,
                phone: request.body.organizationPhone,
                address: request.body.address
            })

            newOrganization.admins.push(req.user);
            newOrganization.tags = tagList;

            newOrganization.save((err) => {
                if (err) throw err
            })

            response.send({newOrganization, user}) 
        }   else {
            return response.status(400).send("Unable to create organization, please fill out required fields.");
        }
    })


    //THESE BOTTOM ROUTES ARE JUST TESTS FOR ME. JUST 
    //EXTRA ROUTES FOR TESTING AND PRACTICE
       // gets user by user id
       app.get('/api/user/:user', (request, response) => {
        User.findById({_id: request.params.user})
        .exec((error, user) => {
            if (error) {
                return response.status(400).send("User not found");
            }
            response.send(user)
        })
    })

    // gets all users
    app.get('/api/users', (request, response) => {
        User.find({}).exec((error, users) => {
            if (error) {
                return response.status(400).send("User not found");
            }
            response.send(users)
        })
    })

    // gets organization by organization id
    app.get('/api/organization/:organization', (request, response) => {
        Organization.findById({_id: request.params.organization})
        .exec((error, organization) => {
            if(error) {
                return response.status(400).send("The organization was not found");
            }
            response.send(organization)
        })
    })

    // get organization by organization id
    app.get('/api/organizations/:organization_id', (request, response) => {
        Organization.findById({_id: request.params.organization_id})
        .exec((error, organization) => {
            if(error) {
                return response.status(400).send("The organization was not found");
            }
            response.send(organization.id)
        })
    })

    // finds all organizations
    app.get('/api/organizations', (request, response) => {
        Organization.find({}).exec((error, organization) => {
            if (error) {
                return response.status(400).send("Organization not found");
            }
            response.send(organization)
        })
    })

}
    // app.put('/api/organizations', (request, response) => {
    //     response.send(req)
    // })