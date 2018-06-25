const Referral = require("../models/Referral");

module.exports = app => {
    //Called by the dashboard. Gets all the referrals sent by the user's organization. The organization ID is sent in the request. Grouping by status will happen on the front end.
    app.get("/api/referrals/sent", (req, res) => {
        Referral.find({ referring_organization: req.user.organization.toHexString() }).
        populate("referring_organization").
        populate("receiving_organization").
        populate("referring_user").
        exec((err, data) => {
            if(err){
                console.log(err);
            }
            res.send(data);
        })

    })

    //Called by the dashboard. Gets all referrals recieved by the user's organization. The organization ID is sent in the request. Grouping by status will happen on the front end.
    app.get("/api/referrals/received", (req, res) => {
        Referral.find({receiving_organization: req.user.organization.toHexString()}).
            populate("referring_organization").
            populate("receiving_organization").
            populate("referring_user").
            exec((err, data) => {
                if(err){
                    console.log(err);
                }
                res.send(data);
            })
    })

    //Posts a referral. Sends an error if certain basic information is missing, specifically the client's name, some form of contact information, and a description
    app.post("/api/referrals", (req, res) => {
        let referral = new Referral();
        if(!req.body.client_name){
            res.status(400).send("Client name required");
        }
        if(!req.body.client_email && !req.body.client_phone){
            res.status(400).send("Contact info required");
        }
        if(!req.body.description){
            res.status(400).send("Description required");
        }
        referral.client_name = req.body.client_name;
        referral.client_phone = req.body.client_phone;
        referral.client_email = req.body.client_email;
        referral.description = req.body.description;
        referring_organization = req.user.organization;
        referral.receiving_organization = req.body.receiving_organization;
        referral.referring_user = req.user._id;

        referral.save((err) => {
            if(err){
                console.log(err);
            } else {
                res.send(referral);
            }
        })
    })

    //adds a note to a specified referral
    app.post("/api/referrals/:referralId/notes", (req, res) => {
        Referral.findbyId(req.params.referralId, (err, referral) => {
            if(err) {
                console.log(err)
            } else {
                let name = req.user.firstName + " " + req.user.lastName;
                referral.notes.push({
                    posting_user: name,
                    text: req.body.text
                });
                referral.save((err) => {
                    if(err) {
                        console.log(err);
                    } else {
                        res.send(referral);
                    }
                })
            }
        })
    })
    
}
