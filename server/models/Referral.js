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
        default: "Pending"
    },
    referring_organization: Schema.Types.ObjectId,
    receiving_organization: Schema.Types.ObjectId,
    referring_user: Schema.Types.ObjectId,
    notes: [{
        date: {
            type: Date,
            default: Date.now
        },
        text: String,
        posting_user: Schema.Types.ObjectId
    }]
})

module.exports = mongoose.model("Referral", ReferralSchema);
