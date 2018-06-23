const passport = require('passport');
const Organization = require('../models/Organization');
//for the tags. formatted into array of objects. {id:tag, text:tag}
//tags auto populate
//query database that are all unique
//get api/tags

module.exports = app => {
    // gets organization info
    app.get('/api/my_organization', (request, response) => {
        response.send(request.organization)
    })

    // sends/updates organization info
    app.post('/api/create_org', (request, response) => {
        let newOrganization = new Organization({
            organizationName: request.body.organizationName,
            description: request.body.description,
            website: request.body.website,
            email: request.body.email,
            phone: request.body.phone,
            address: request.body.address,
            members: []
        })

        newOrganization.save((err) => {
            if (err) throw err
        response.send(newOrganization)
        })   
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