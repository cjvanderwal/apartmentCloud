// Load required packages
var mongoose = require('mongoose');

var ApartmentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    company: {type: String, required: true},
    price: {type: Number, required: true},
    noOfBedroom: {type: Number, required: true},
    noOfBathRoom: {type: Number, required: true},
    image: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Apartment', ApartmentSchema);
