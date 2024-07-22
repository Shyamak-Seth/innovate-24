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
        required: true,
        default: 0
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
    crops: {
        type: Array,
        required: true,
        default: []
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    kyc: {
        type: Boolean,
        required: true,
        default: false
    },
    age: {
        type: Number,
        required: true,
        default: 0
    },
    money: {
        type: Number,
        required: true,
        default: 0
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    pensionClaimed: {
        type: Boolean,
        required: true,
        default: false
    },
    retired: {
        type: Boolean,
        default: false,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema)