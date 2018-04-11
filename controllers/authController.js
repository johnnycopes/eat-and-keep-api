const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

/* 
	// exports.login = {};
	not defined  because the passport.authenticate() method handles 
	all the necessary validation and is best used as middleware
*/

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

exports.forgot = async (req, res) => {
	// 1. see if user email exists
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		res.status(400).send('Email does not exist');
	}
	// 2. set reset tokens and expiry on their account
	user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
	user.resetPasswordExpires = Date.now() + 360000; // 1 hour from now
	await user.save();
	// 3. send them an email with the token
	// TODO: make sure that a route gets created in the client to handle account reset
	const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
	await mail.send({
		user,
		filename: 'password-reset',
		subject: 'Eat & Keep password reset',
		resetURL
	});
	res.status(200).send('A reset link has been sent to the user');
};

exports.reset = async (req, res) => {
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() }
	});
	if (!user) {
		res.status(400).send('Password reset is invalid or has expired');
		return;
	}
	// if there is a user, show the reset password form
	res.status(200).json(req.params);
};

exports.confirmedPasswords = (req, res, next) => {
	if (req.body.password === req.body['password-confirm']) {
		next();
		return;
	}
	res.status(400).send('Passwords do not match');
};

exports.update = async (req, res) => {
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() }
	});
	if (!user) {
		res.status(400).send('Password reset is invalid or has expired');
		return;
	}
	// set new password and clear unneeded fields, then save
	const setPassword = promisify(user.setPassword, user);
	await setPassword(req.body.password);
	user.resetPasswordToken = undefined;
	user.resetPasswordExpires = undefined;
	await user.save();
	res.status(200).send('Password successfully updated');
};