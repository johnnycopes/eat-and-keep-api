const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).send(user);
};

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(200).send(user);
};

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // return the new user rather than the old one
    runValidators: true // compare req.body input to the validators defined in the schema
  }).exec();
  res.status(200).send(user);
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  res.status(200).send(`User ${user.name} has been deleted.`);
};