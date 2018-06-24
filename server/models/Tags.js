const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagsSchema = new Schema({
    text: { type: String, lowercase: true, required: true },
})

const Tags = mongoose.model("Tags", tagsSchema)

module.exports = Tags;