var Dwdav = (function() {
	'use strict';

	var request = require('request'),
		fs = require('fs'),
		instance;

	function init(config) {
		// Private functions and variables

		var instanceConfig = config;

		function buildRequestBody(options) {
			return {
				baseUrl: 'https://' + instanceConfig.hostname + '/on/demandware.servlet/webdav/Sites/Cartridges/' + instanceConfig.version,
				uri: options.uri,
				method: options.method,
				auth: {
					user: instanceConfig.username,
					password: instanceConfig.password
				},
				strictSSL: false
			};
		}

		function putFile(filePath) {
			var requestObject,
				promise,
				requestOptions = buildRequestBody({
					uri: '/' + filePath,
					method: 'PUT'
				});

			promise = new Promise(function(resolve, reject) {
				requestObject = request(requestOptions, function(err, res, body) {
					if (err || (res.statusCode < 200 || res.statusCode > 300)) {
						return reject('Error message: ' + err + '\nResponse body: ' + body);
					}

					resolve(body);
				});

				fs.createReadStream(instanceConfig.cwd + '/' + filePath).pipe(requestObject);
			});

			return promise;
		}

		return {
			// Public functions and variables

			putFile: putFile
		};
	}

	return {
		getInstance: function(config) {
			if (!instance) {
				instance = init(config);
			}

			return instance;
		}
	};
}());

module.exports = Dwdav;