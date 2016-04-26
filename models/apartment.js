// Load required packages
var mongoose = require('mongoose');

var ApartmentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lat: {type: Number, required: true},
    lon: {type: Number, required: true},
    company: {type: String, required: true},
    price: {type: Number, required: true},
    noOfBedroom: {type: Number, required: true},
    noOfBathRoom: {type: Number, required: true},
    image: {type: String},
    startLease: {type: Date, required: true},
    endLease: {type: Date, required: true}
});

module.exports = mongoose.model('Apartment', ApartmentSchema);
