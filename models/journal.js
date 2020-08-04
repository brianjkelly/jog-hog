const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    title: {
        type: String,
        required: true        
    },
    author: {
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
    // entries: [entrySchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Journal', journalSchema);