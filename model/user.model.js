const mongoose = require('mongoose');
const constant = require('../utils/constant');

const userSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true,
    },
    userId: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
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
        type: 'string',
        required: true,
        default: constant.userTypes.customer,
        enum: [
            constant.userTypes.customer,
            constant.userTypes.engineer,
            constant.userTypes.admin
        ]
    },
    userStatus: {
        type: 'string',
        required: true,
        default: constant.userStatus.approved,
        enum: [
            constant.userStatus.approved,
            constant.userStatus.rejected,
            constant.userStatus.pending,
        ]
    }
})

module.exports = mongoose.model("users", userSchema)