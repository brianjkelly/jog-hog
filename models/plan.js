const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    days: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Day' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);