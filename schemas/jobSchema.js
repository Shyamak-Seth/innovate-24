const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };
const nonReqString = { type: String, required: false };

const userSchema = new Schema({
    for: reqString,
    salary: {
        type: Number,
        required: true,
        default: 0
    },
    job: reqString,
    daysPerWeek: {
        type: Number,
        required: true,
        default: 0
    },
    location: reqString,
    takenBy: {
        type: String,
        required: true,
        default: 'none'
    }
})

module.exports = mongoose.model("Job", userSchema)