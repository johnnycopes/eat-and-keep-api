const express = require('express');
const passport = require('passport');
const router = express.Router();
const apiController = require('../controllers/apiController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/api/users', authController.isLoggedIn, catchErrors(apiController.getUsers));
router.get('/api/users/:id', catchErrors(apiController.getUser));
router.post('/api/users', catchErrors(apiController.createUser));
router.post('/api/users/:id', catchErrors(apiController.updateUser));
router.delete('/api/users/:id', catchErrors(apiController.deleteUser));

// REGISTER
router.post('/api/register',
	userController.validateRegister,
	catchErrors(userController.register),
	passport.authenticate('local'),
	(req, res) => res.status(200).send('User successfully created')
);

// LOGIN / LOGOUT
router.post('/api/login',
	passport.authenticate('local'),
	(req, res) => res.status(200).send('User is now logged in')
);
router.get('/api/logout', authController.logout);

// USER ACCOUNT
// this route might not be needed because the front-end will control access to the page
// router.get('/api/account', authController.isLoggedIn, userController.getAccount);
router.post('/api/account', catchErrors(userController.updateAccount));

module.exports = router;