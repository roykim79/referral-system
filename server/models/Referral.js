const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReferralSchema = new Schema({
    client_name: String,
    client_phone: String,
    client_email: String,
    description: String,
    created: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "pending",
        lowercase: true
    },
    referring_organization: {
        type: Schema.Types.ObjectId,
        ref: "Organization"
    },
    receiving_organization: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
    },
    referring_user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    notes: [{
        date: {
            type: Date,
            default: Date.now
        },
        text: String,
        posting_user: String
    }]
})

module.exports = mongoose.model("Referral", ReferralSchema);
