const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    notes: String,
    days: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Day' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);