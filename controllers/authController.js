const passport = require('passport');

// exports.login = {}
// not defined as a controller because the passport.authenticate() method
// handles all the necessary validation and is best used as middleware

exports.logout = (req, res) => {
	req.logout();
	res.status(200).send('User is now logged out');
};

exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
		return;
	}
	res.status(401).send('User is not logged in');
};