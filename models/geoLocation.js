const mongoose = require('mongoose');

const GeoLocation = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
})

module.exports = { GeoLocation };