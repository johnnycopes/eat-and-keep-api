const app = require('./app');
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
	console.log(`We're live on port ${port}`);
});