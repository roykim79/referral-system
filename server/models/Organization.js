const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    organizationName: { type: String, lowercase: true, unique: true, required: true },
    description: { type: String, required: true },
    website: { type: String, default: null },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, default: null },
    logo: { type: String, default: null },
    dateCreated: { type: Date, default: Date.now },
    members: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = {
    Organization: mongoose.model("Organization", organizationSchema)
};