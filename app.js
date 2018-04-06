const express = require('express');
const app = express();
const db = require('./db');

const UserController = require('./user/user-controller');
app.use('/users', UserController);

module.exports = app;