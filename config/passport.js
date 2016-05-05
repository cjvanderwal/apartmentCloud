var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
/*
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'username',
		passwordField : 'password',
		emailField    : 'email',
		nameField     : 'name',

	},

	function(username, password, email, name, done) {
*/
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'username',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, username, password, done) {
		User.findOne({'local.username' : username}, function(err, user) {
			if(err)
				return done(err);
			if(user) {
				return done(null, false);
			} else {
				
				var newUser = new User();
		        newUser.local.username = username;
				newUser.local.password = newUser.generateHash(password);
				newUser.local.email = req.body.email;
				newUser.local.name = req.body.name;

				newUser.save(function(err) {
					if(err)						
						throw err;
					return done(null, newUser);
				});
			}

		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
	},
	function(username, password, done) {
		User.findOne({'local.username': username}, function(err, user) {
			if(err)
				return done(err);
			if(!user)
				return done(null, false);
			if(!user.validPassword(password))
				return done(null, false);
			return done(null, user);

		});
	}));

};
