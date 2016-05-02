// Load required packages
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    apartmentId: {type: String, required: true},
    userId: {type: String, required: true},
    username: {type: String, required: true},
    rating: {type: Number, required: true},
    title: {type: String, required: true},
    comment: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', CommentSchema);
