const mongoose = require('mongoose');
const constant = require('../utils/constant');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        immutable: true,
        default: Date.now()
    },
    userType: {
        type: String,
        required: true,
        default: constant.userTypes.customer,
        enum: [
            constant.userTypes.customer,
            constant.userTypes.engineer,
            constant.userTypes.admin
        ]
    },
    userStatus: {
        type: String,
        required: true,
        default: constant.userStatus.approved,
        enum: [
            constant.userStatus.approved,
            constant.userStatus.rejected,
            constant.userStatus.pending,
        ]
    },
    ticketCreated: {
        type: [mongoose.SchemaTypes.ObjectId], 
        ref: "tickets"
    },
    ticketAssigneed: {
        type: [mongoose.SchemaTypes.ObjectId], 
        ref: "tickets"
    }
})

module.exports = mongoose.model("users", userSchema)