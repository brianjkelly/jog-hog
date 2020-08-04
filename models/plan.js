const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const daySchema = new Schema({
    dayNumber: {
        type: Number,
        min: 1,
        max: 182,
        required: true
    },
    dayType: {
        type: String,
        enum: ['easy', 'hard', 'tempo']
    },
    distance: {
        type: Number,
        min: 1,
        max: 30
    },
    timeMinutes: {
        type: Number,
        min: 1,
        max: 600
    },
    timeSeconds: {
        type: Number,
        min: 0,
        max: 59
    },
    notes: {
        type: String,
        maxlength: 300
    }}, {
        timestamps: true
    }
);

const planSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        enum: ['5k', '10k', 'Half-Marathon', 'Marathon']
    },
    duration: {
        type: Number,
        default: 4,
        min: 1,
        max: 26
    },
    notes: {
        type: String,
        maxlength: 300
    },
    days: [daySchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);