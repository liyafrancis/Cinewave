const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rows: { type: Number, required: true },
    columns: { type: Number, required: true },
    district: { type: String, required: true }
});

module.exports = mongoose.model('Theatre', theatreSchema);