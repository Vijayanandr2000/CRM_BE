const mongoose = require('mongoose');
const constant = require('../utils/constant');

const ticketSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    ticketPriority: {
        type: Number,
        required: true,
        default: 4
    },
    assignee: {
        type: String,
    },
    reporter: {
        type: String,
        required: true,
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
    ticketStatus: {
        type: String,
        required: true,
        default: constant.ticketStatus.open,
        enum: [
            constant.ticketStatus.open,
            constant.ticketStatus.close,
            constant.ticketStatus.pending,
        ]
    },
    
}, { versionKey : false })

module.exports = mongoose.model("tickets", ticketSchema)