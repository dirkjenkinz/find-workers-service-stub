const mongoose = require('mongoose');
const GeoLocation = require('./geoLocation');

const workerSchema = new mongoose.Schema({
    workerId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: GeoLocation,
    home: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Worker', workerSchema);