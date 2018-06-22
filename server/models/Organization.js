const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    organizationName: String,
    description: String,
    website: String,
    email: String,
    phone: Number,
    address: String,
    logo: String
});

module.exports = {
    Organization: mongoose.model("Organization", organizationSchema)
};