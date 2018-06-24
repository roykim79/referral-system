const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagsSchema = new Schema({
    name: { type: String, lowercase: true, required: true },
    organization: [{ type: Schema.Types.ObjectId, ref: 'Organization', default:[] }]
})

const Tags = mongoose.model("Tags", tagsSchema)

module.exports = Tags;