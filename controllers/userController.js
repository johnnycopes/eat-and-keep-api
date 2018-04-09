const mongoose = require('mongoose');
const User = mongoose.model('User');
// const promisify = require('es6-promisify');

exports.login = (req, res) => {
  res.status(200).json({"hey": "hey"});
};

exports.registerForm = (req, res) => {

};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name').notEmpty();
  req.checkBody('email', 'Invalid email address').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'You must supply a password').notEmpty();
  req.checkBody('password-confirm', 'You must supply a password confirmation').notEmpty();
  req.checkBody('password-confirm', 'Oops! Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
    return;
  }
  next(); // there were no errors!
};

exports.register = async (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email
  });
  User.register(user, req.body.password, (err, user) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.send('it works!');
    next();
  });
  /*
    commenting out promisify code for now because it keeps throwing errors
    
    // const register = util.promisify(User.register, User); // convert the User.register method
    // await register(user, req.body.password);
  */
};