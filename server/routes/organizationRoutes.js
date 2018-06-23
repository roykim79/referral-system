const passport = require('passport');
const Organization = require('../models/Organization');
const User = require('../models/User')
const Tags = require('../models/Tags');
//for the tags. formatted into array of objects. {id:tag, text:tag}
//tags auto populate
//query database that are all unique
//get api/tags

module.exports = app => {
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

    // get organization by organization id
    app.get('/api/organization/:organization', (request, response) => {
        Organization.findById({_id: request.params.organization})
        .exec((error, organization) => {
            if(error) {
                return response.status(400).send("The organization was not found");
            }
            response.send(organization)
        })
    })

    // creates organization with a user as admin. 
    app.post('/api/create_org', (request, response) => {
        if (request.body && request.body.password) {
            let tempTags = [];

            if (Array.isArray(request.body.tags) && request.body.tags.length != 0 ) {
                request.body.tags.forEach((tag) => {
                    Tags.findOne({name: tag}, (err, result) => {
                        if(err) throw err;
                        if(result.id) {
                            tempTags.push(result.id)
                        } else {
                            let newTag = new Tags({
                                name: tag
                            })
    
                            newTag.save((err) => {
                                if (err) throw err
                            });
    
                            tempTags.push(newTag.id);
                        }
    
                    })
                })

                let newOrganization = new Organization({
                    organizationName: request.body.organizationName,
                    description: request.body.description,
                    website: request.body.website,
                    email: request.body.organizationEmail,
                    phone: request.body.organizationPhone,
                    address: request.body.address,
                    tags: tempTags
                })
    
                let user = new User({
                    username: request.body.username,
                    firstName: request.body.firstName,
                    lastName: request.body.lastName,
                    email: request.body.email,
                    organization: newOrganization.id,
                    status: "success",
                    role: "admin"        
                })
    
                newOrganization.members.push(user.id);
            
                user.setPassword(request.body.password);
            
                user.save((err)=>{
                    if(err) throw err;
                });
    
                newOrganization.save((err) => {
                    if (err) throw err
                })  
    
                response.send({newOrganization, user}) 
            }
        }   else {
            return response.status(400).send("Unable to create organization, please fill out required fields.");
        }
    })
}
    // app.put('/api/organizations', (request, response) => {
    //     response.send(req)
    // })

    







// organizationName: { type: String, lowercase: true, unique: true, required: true },
//     description: { type: String, required: true },
//     website: { type: String, default: null },
//     email: { type: String, required: true },
//     phone: { type: Number, required: true },
//     address: { type: String, default: null },
//     logo: { type: String, default: null },
//     dateCreated: { type: Date, default: Date.now },
//     members: [{type: Schema.Types.ObjectId, ref: 'User'}]