const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getPlaces = async (req, res) => {
	const user = await User.findById(req.user._id);
	res.status(200).send(user.places);
};

exports.getPlace = async (req, res) => {
	const place = await User.findById(req.user._id,
		{ places: { $elemMatch: { yelp_id: req.params.yelp_id } }
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
		{
			new: true,
			runValidators: true,
			upsert: true
		}
	);
	res.status(200).send(user.places);
};

exports.updatePlace = async (req, res) => {
	const updates = {
		yelp_id: req.params.yelp_id,
		comment: req.body.comment,
		visited: req.body.visited,
		recommended: req.body.recommended
	};
	const user = await User.findOneAndUpdate(
		{ _id: req.user._id, places: { $elemMatch: { yelp_id: req.params.yelp_id } } },
		{ $set: { 'places.$': updates } }, // use updates obj to update the selected place
		{
			new: true, // return the new user rather than the old one
			runValidators: true, // compare req.body input to the validators defined in the schema
			context: 'query' // required for Mongoose to perform the query properly
		}
	);
	res.status(200).send(user.places);
};

exports.removePlace = async (req, res) => {
	const user = await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $pull: { 'places': { yelp_id: req.params.yelp_id } } },
		{ 'safe': true }
	);
	res.status(200).send(user.places);
};