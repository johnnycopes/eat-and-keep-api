const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const placeController = require('../controllers/placeController');
const { catchErrors } = require('../handlers/errorHandlers');

// PLACES

router.get('/api/places', authController.isLoggedIn, catchErrors(placeController.getPlaces));
router.get('/api/places/:id', authController.isLoggedIn, catchErrors(placeController.getPlace));
router.post('/api/places', authController.isLoggedIn, catchErrors(placeController.addPlace));
router.post('/api/places/:id', authController.isLoggedIn, catchErrors(placeController.updatePlace));
router.delete('/api/places/:id', authController.isLoggedIn, catchErrors(placeController.removePlace));

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
/* 
	this route might not be needed because the front-end will control access to the page
	// router.get('/api/account', authController.isLoggedIn, userController.getAccount);
*/
router.post('/api/account', catchErrors(userController.updateAccount));
router.post('/api/account/forgot', catchErrors(authController.forgot));
router.get('/api/account/reset/:token', catchErrors(authController.reset));
router.post('/api/account/reset/:token',
	authController.confirmedPasswords, // check that the passwords are the same
	catchErrors(authController.update) // finally, update their password
);

module.exports = router;