var mongoose = require('mongoose');

var UserSchema    = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  email: {type:String, required:true, unique:true},
  name: {type:String, required:true},
  dateCreated: {type:Date, default: Date.now},
  bcrypt_pass: {type:String, required:true},
  //favorited_ids: {type:[ObjectId], default:[]},
  bio: {type:String, default:""},
  //picture_id: {type:ObjectId, default:"put default image id"}
});

module.exports = mongoose.model('user', UserSchema);