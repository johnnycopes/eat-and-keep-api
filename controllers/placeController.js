const mongoose = require('mongoose');
const User = mongoose.model('User');
const Place = mongoose.model('Place');

exports.getPlaces = async (req, res) => {
	const places = await Place.find();
	res.status(200).send(places);
};

exports.getPlace = async (req, res) => {
	const place = await Place.findOne({
		$text: {
			$search: req.params.yelp_id
		}
	});
	res.status(200).send(place);
};

exports.addPlace = async (req, res) => {
	const place = new Place(req.body);
	await place.save();
	res.status(200).send(place);
};

exports.deletePlace = async (req, res) => {
	await Place.findOneAndRemove({
		$text: {
			$search: req.params.yelp_id
		}
	});
	res.status(200).send(`Place with Yelp ID "${req.params.yelp_id}" has been deleted`);
};