var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema    = new mongoose.Schema({
  local: {
      username: {type:String, required:true, unique:true},
      email: {type:String, required:true, unique:true},
      name: {type:String, required:true},
      dateCreated: {type:Date, default: Date.now},
      password: {type:String, required:true},
      //favorited_ids: {type:[ObjectId], default:[]},
      bio: {type:String, default:""},
      picture_url: {type:String, default:"https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg"}
  }
});

UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);