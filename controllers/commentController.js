const mongoose = require('mongoose');
const User = mongoose.model('User');
const Place = mongoose.model('Place');

// TODO: make API endpoints to retrieve comments

exports.getComments = async (req, res) => {

};

exports.addComment = async (req, res) => {
	const comment = {
		text: req.body.comment,
		author: req.user._id
	};
	const place = await Place.findByIdAndUpdate(req.body.place_id,
		{ $push: { comments: comment } }
	);
	res.status(200).send(comment);
};



// exports.getPlaces = async (req, res) => {
// 	const places = await User.findById(req.params.user_id, 'places');
// 	res.status(200).send(places);
// };

// exports.getPlace = async (req, res) => {
// 	const place = await User.findById(req.params.user_id, {
// 		places: {$elemMatch: {
// 			yelpID: req.params.yelp_id
// 		}}
// 	});
// 	res.status(200).send(place);
// };

// exports.addPlace = async (req, res) => {
// 	// TODO: make this route work
// 	// const place = new Place(req.body);
// 	// const user = await User.findById(req.params.user_id);
// 	// user.places.push(place);
// 	// await user.save();
// 	// res.status(200).send(place);
// };

// exports.updatePlace = async (req, res) => {
// 	// TODO: make this route work
// 	// const user = await User.findById(req.params.user_id);
// 	// user.update({'places.id': req.params.}, {

// 	// })
// 	// 	{$set: {'places': place}}, {
// 	// 	new: true, // return the new user rather than the old one
// 	// 	runValidators: true // compare req.body input to the validators defined in the schema
// 	// }).exec();
// 	// res.status(200).send(user);
// };

// exports.deleteUser = async (req, res) => {
// 	// TODO: make this route work
// 	// const user = await User.findByIdAndRemove(req.params.id);
// 	// res.status(200).send(`User ${user.name} has been deleted.`);
// };