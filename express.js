const
	path = require('path'),
	express = require('express'), 
	app = express();

app.get('/', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.get('/bundle.js', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'dist/bundle.js'));
});

app.listen(3000);
