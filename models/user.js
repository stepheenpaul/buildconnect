const { type } = require("@hapi/joi/lib/extend");
const mongoose = require("mongoose")
const {Schema, model} = mongoose;


const userSchema = new Schema({
    fullName:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true,
    }, 

    verified: {
        type: Boolean,
        default: false
    },

    userType: {
        type:String,
    }

}, {timestamps: true})

module.exports = { User: model('user', userSchema) };