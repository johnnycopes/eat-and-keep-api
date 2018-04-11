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
		yelpID: {
			type: String,
			required: true
		},
		comment: {
			type: String,
			required: false
		},
		visited: {
			type: Boolean,
			required: false
		},
		recommended: {
			type: Boolean,
			required: false
		}
	}],
	created: {
		type: Date,
		default: Date.now()
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date
});

// TODO: index yelpID in places array to make it faster to search
userSchema.index({
	yelpID: 'text'
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);