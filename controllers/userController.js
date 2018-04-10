const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.validateRegister = (req, res, next) => {
	req.sanitizeBody('name');
	req.checkBody('name', 'You must supply a name').notEmpty();
	req.checkBody('email', 'Invalid email address').isEmail();
	req.sanitizeBody('email').normalizeEmail({
		remove_dots: false,
		remove_extension: false,
		gmail_remove_subaddress: false
	});
	req.checkBody('password', 'You must supply a password').notEmpty();
	req.checkBody('password-confirm', 'You must supply a password confirmation').notEmpty();
	req.checkBody('password-confirm', 'Oops! Passwords do not match').equals(req.body.password);

	const errors = req.validationErrors();
	if (errors) {
		res.status(400).send(errors);
		return;
	}
	next(); // there were no errors!
};

exports.register = async (req, res, next) => {
	const user = new User({ email: req.body.email, name: req.body.name });
	const register = promisify(User.register, User); // convert the User.register method
	await register(user, req.body.password);
	next(); // pass to authController.login
};

exports.getAccount = (req, res) => res.status(200).send(req.user);

exports.updateAccount = async (req, res) => {
	const updates = {
		name: req.body.name,
		email: req.body.email
	};
	const user = await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $set: updates }, // takes updates obj and puts it on the user
		{
			new: true, // return the new user rather than the old one
			runValidators: true, // compare req.body input to the validators defined in the schema
			context: 'query' // required for Mongoose to perform the query properly
		}
	);
	res.status(200).send(user);
};