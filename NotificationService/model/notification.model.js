const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    recepientEmail: {
        type: String, 
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    requestor: {
        type: String,
    },
    status: {
        type: Boolean,
        required: true,
        default: false
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
})

module.exports = mongoose.model("notifications",notificationSchema)