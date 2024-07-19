const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };
const nonReqString = { type: String, required: false };

const userSchema = new Schema({
    fname: reqString,
    lname: reqString,
    email: reqString,
    password: reqString,
    landSize: {
        type: Number,
        required: true
    },
    loyaltyLevel: {
        type: String,
        required: true,
        default: 'Bronze'
    },
    production: {
        type: Number,
        required: true,
        default: 0
    },
    productionDuringYear: {
        type: Number,
        required: true,
        default: 0
    },
    crops: {
        type: Array,
        required: true,
        default: []
    },
    points: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model("User", userSchema)