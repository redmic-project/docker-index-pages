var commander = require('commander');

module.exports = function(version) {

	commander
		.version(version)
		.option('-P, --path <value>', null)
		.option('-d, --debug', null)
		.option('-p, --port <n>', null, 3000)
		.parse(process.argv);

	return {
		path: commander.path,
		debug: commander.debug || false,
		port: commander.port
	};
};
