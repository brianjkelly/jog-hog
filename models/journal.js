const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const entrySchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    dayNumber: {
        type: Number,
        min: 1,
        max: 182,
        required: true
    },
    dayType: {
        type: String,
        enum: ['Easy', 'Hard', 'Tempo', 'Rest']
    },
    actDistance: {
        type: Number,
        min: 1,
        max: 30
    },
    actTime: {
        type: Number,
        min: 1
    },
    notes: {
        type: String,
        maxlength: 300
    }, 
}, {
    timestamps: true
});

const journalSchema = new Schema({
    title: {
        type: String,
        required: true        
    },
    runner: {
        type: Schema.Types.ObjectId,
        ref: 'Runner'
    },
    plan: {
        type: Schema.Types.ObjectId,
        ref: 'Plan'
    },
    notes: {
        type: String,
        maxlength: 300
    },
    entries: [entrySchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Journal', journalSchema);