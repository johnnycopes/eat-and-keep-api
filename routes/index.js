const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/api/users', catchErrors(apiController.getUsers));
router.get('/api/users/:id', catchErrors(apiController.getUser));
router.post('/api/users', catchErrors(apiController.createUser));
router.post('/api/users/:id', catchErrors(apiController.updateUser));
router.delete('/api/users/:id', catchErrors(apiController.deleteUser));

module.exports = router;