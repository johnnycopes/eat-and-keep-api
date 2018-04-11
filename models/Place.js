const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Place', placeSchema);