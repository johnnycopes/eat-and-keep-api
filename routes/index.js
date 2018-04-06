const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
	const test = { title: 'Hey!', body: 'it works!' }
	res.json(test);
});

module.exports = router;