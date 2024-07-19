const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };
const nonReqString = { type: String, required: false };

const userSchema = new Schema({
    fname: reqString,
    lname: reqString,
    email: reqString,
    date: {
        type: Number,
        required: true,
        default: Number(new Date())
    },
    subject: reqString,
    body: reqString
})

module.exports = mongoose.model("Report", userSchema)