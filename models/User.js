const mongoose = require('mongoose');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Your name is required'
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		validate: [validator.isEmail, 'Invalid email address'],
		required: 'A valid email address is required'
	},
	city: {
		type: String,
		required: false
	},
	places: [{
		yelp_id: {
			type: String,
			trim: true,
			lowercase: true,
			required: 'A Yelp ID is required'
		},
		comment: {
			type: String
		},
		visited: {
			type: Boolean
		},
		recommended: {
			type: Boolean
		}
	}],
	created: {
		type: Date,
		default: Date.now()
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);