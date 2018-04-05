const testRoutes = require('./test');

module.exports = function(app, db) {
	testRoutes(app, db);
	// Other route groups could go here, in the future
};