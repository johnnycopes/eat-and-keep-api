const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/api/users', catchErrors(apiController.getUsers));
router.get('/api/users/:id', catchErrors(apiController.getUser));
router.post('/api/users', catchErrors(apiController.createUser));
router.post('/api/users/:id', catchErrors(apiController.updateUser));
router.delete('/api/users/:id', catchErrors(apiController.deleteUser));

router.get('/api/login', userController.login);
router.get('/api/register', userController.register);
router.post('/api/register',
  userController.validateRegister,
  userController.register
);

module.exports = router;