const passport = require('passport');
const Organizations = require('../models/Organization');
const Users = require('../models/User');
const Referral = require('../models/Referral');
const mongoose = require('mongoose');
const faker = require('faker');

module.exports = app => {
  // create fake referrals
  app.get('/api/fake-referrals', async (request, response) => {
    Referral.collection.drop();

    let organizationNames = [];
    let usernames = [];
    let clientNames = [];
    let referralArray = [];
    let statusArray = ["pending", "accepted", "contacted", "rejected", "completed"];

    for (let x = 0; x < 50; x++) {
      let clientname = faker.name.firstName();
      clientNames.push(clientname);
    }


    let organizationObject = await Organizations.find({}).then(result => {
        if (result) {
          return result
        }
      })

    let userObject = await Users.find({}).then(result => {
        if (result) {
          return result
        }
      })

    for (x = 0; x < 100; x++) {
      let sendingUser = userObject[Math.floor(Math.random() * Math.floor(20))];
      let receivingUser = userObject[Math.floor(Math.random() * Math.floor(20))];
      let sendingOrg = organizationObject[Math.floor(Math.random() * Math.floor(20))]

      let newReferral = new Referral({
        client_name: clientNames[Math.floor(Math.random() * Math.floor(50))],
        client_phone: "(919)999-9999",
        client_email: "random@example.com",
        description: `Important from ${sendingOrg.organizationName}`,
        referring_organization: sendingOrg.id,
        receiving_organization: organizationObject[Math.floor(Math.random() * Math.floor(20))].id,
        referring_user: sendingUser.id,
        posting_user: receivingUser.id,
        tasks: [{ text: `hi from ${sendingUser.firstName}`, posting_user: receivingUser.firstName }],
        status: statusArray[Math.floor(Math.random() * Math.floor(5))]
      })

      newReferral.save();
      referralArray.push(newReferral);
    }

    return response.send(referralArray);
  })
}