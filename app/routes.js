module.exports = function(app, passport) {

	app.post('/signup', passport.authenticate('local-signup', {failureRedirect: '/#/login?newUser=false'}), function(req, res) {
		res.redirect('/#/user/'+res.req.user._id);
	});
	app.post('/login', passport.authenticate('local-login', {failureRedirect: '/#/login'}), function(req, res) {
		res.redirect('/#/user/'+res.req.user._id);
	});
	app.get('/profile', isLoggedIn, function(req, res) {
		res.json({
			user: req.user
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated())
			return next();

		res.json({
			error: "User not logged in"
		});
	}

};
