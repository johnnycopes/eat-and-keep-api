const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const User = require('../user/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const VerifyToken = require('./verify-token');

// Register a new user
router.post('/register', (req, res) => {
	const hashedPassword = bcrypt.hashSync(req.body.password, 8);
	User.create({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	},
		(err, user) => {
			if (err) {
				return res.status(500).send("There was a problem registering the user.");
			}
			// create a token
			const token = jwt.sign({ id: user._id }, config.secret, {
				expiresIn: 86400 // expires in 24 hours
			});
			res.status(200).send({ auth: true, token: token });
		});
});

// Log in an existing user
router.post('/login', (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (err) {
			return res.status(500).send('Error on the server.');
		}
		else if (!user) {
			return res.status(404).send('No user found.');
		}
		const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, token: null });
		}
		const token = jwt.sign({ id: user._id }, config.secret, {
			expiresIn: 86400 // expires in 24 hours
		});
		res.status(200).send({ auth: true, token: token });
	});
});

// Log out the current user
router.get('/logout', (req, res) => {
	res.status(200).send({ auth: false, token: null });
});

router.get('/me', VerifyToken, (req, res) => {
	const token = req.headers['x-access-token'];
	if (!token) {
		return res.status(401).send({ auth: false, message: 'No token provided.' });
	}
	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		}
		User.findById(decoded.id, 
			{ password: 0 }, // projection
			(err, user) => {
				if (err) {
					return res.status(500).send("There was a problem finding the user.");
				}
				else if (!user) {
					return res.status(404).send("No user found.");
				}
				res.status(200).send(user);
			});
	});
});

module.exports = router;