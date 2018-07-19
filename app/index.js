var packageJson = require('../package.json'),
	version = packageJson.version,
	description = packageJson.description,

	params = require('./params')(version),

	logging = require('./logging'),
	logger = logging.logger,

	sitePath = params.path,
	port = params.port,
	debug = params.debug,

	path = require('path'),
	express = require('express'),
	http = require('http'),
	app = express();

logging.registerAppLogger(params, app);

function exposeContents(directoryName) {

	var pathOptions = {
		maxAge: 600000,
		index: false
	};

	var exposedPath = path.join(__dirname, '..', directoryName),
		servedPath = express['static'](exposedPath, pathOptions);

	app.use(servedPath)
		.use('/' + directoryName, servedPath);
}

exposeContents(sitePath);
exposeContents('index.js');
exposeContents('index.css');

app.set('view engine', 'pug')
	.set('views', path.join(__dirname, '..', 'views'))
	.get('/', function (req, res) {
		res.render('index', {
			path: sitePath
		});
	});

http.createServer(app).listen(port, function() {

	logger.verbose(description + ' v%s', version);
	logger.verbose('Listening on port %d', port);
	debug && logger.verbose('Debug mode enabled');
});
