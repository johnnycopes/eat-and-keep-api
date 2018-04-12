const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
	yelp_id: {
		type: String,
		trim: true,
		index: true,
		lowercase: true,
		required: 'A unique Yelp ID is required'
	},
	comments: [{
		text: String,
		author: {
			type: mongoose.Schema.ObjectId,
			ref: 'User'
		}
	}],
	visits: [{
		visited: Boolean,
		visitor: {
			type: mongoose.Schema.ObjectId,
			ref: 'User'
		}
	}],
	recommendations: [{
		recommended: Boolean,
		reviewer: {
			type: mongoose.Schema.ObjectId,
			ref: 'User'
		}
	}]
});

placeSchema.index({
	yelp_id: 'text'
});

module.exports = mongoose.model('Place', placeSchema);