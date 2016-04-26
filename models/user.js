var mongoose = require('mongoose');

var UserSchema    = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  email: {type:String, required:true, unique:true},
  name: {type:String, required:true},
  dateCreated: {type:Date, default: Date.now},
  bcrypt_pass: {type:String, required:true},
  //authorization_token: {type:String, default:""},
  //favorited_ids: {type:[ObjectId], default:[]},
  bio: {type:String, default:""},
  picture_url: {type:String, default:"https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg"}
});

module.exports = mongoose.model('user', UserSchema);