// Load required packages
var mongoose = require('mongoose');

var ApartmentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    lat: {type: Number},
    lon: {type: Number},
    company: {type: String, required: true},
    price: {type: Number, required: true},
    noOfBedroom: {type: Number, required: true},
    noOfBathRoom: {type: Number, required: true},
    description: {type: String, required: true},
    image: {type: String, default: 'https://openclipart.org/download/19100/josuemb-house-silhouette.svg'},
    startLease: {type: Date, required: true},
    endLease: {type: Date, required: true}
});

module.exports = mongoose.model('Apartment', ApartmentSchema);
