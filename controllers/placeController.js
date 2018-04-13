const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getPlaces = async (req, res) => {
	const user = await User.findById(req.user._id);
	res.status(200).send(user.places);
};

exports.getPlace = async (req, res) => {
	const place = await User.findById(req.user._id,
		{ places: { $elemMatch: { _id: req.params.id } }
	});
	res.status(200).send(place.places[0]);
};

exports.addPlace = async (req, res) => {
	const place = {
		yelp_id: req.body.yelp_id,
		comment: req.body.comment,
		visited: req.body.visited,
		recommended: req.body.recommended
	};
	const user = await User.findByIdAndUpdate(req.user._id,
		{ $push: { places: place } },
		{ 'new': true, 'upsert': true }
	);
	res.status(200).send(user.places);
};

exports.updatePlace = async (req, res) => {
	// coming soon
};

exports.removePlace = async (req, res) => {
	const place = await User.findByIdAndUpdate(req.user._id,
		{ $pull: { places: { _id: req.params.id } } },
		{ 'safe': true }
	);
	res.status(200).send(`Place with ID ${req.params.id} successfully deleted`);
};