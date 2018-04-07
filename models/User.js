const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Your name is required'
	},
	email: {
		type: String,
		trim: true,
		required: 'A valid email address is required'
	},
	password: {
		type: String,
		required: 'A password is required'
	},
	city: {
		type: String,
		required: false
	},
	restaurants: [{
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
	}
});

module.exports = mongoose.model('User', UserSchema);