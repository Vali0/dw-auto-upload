var Dwdav = (function() {
	'use strict';

	var request = require('request'),
		fs = require('fs'),
		instance;

	function init(config) {
		// Private functions and variables

		var instanceConfig = config;

		function getOpts() {
			return {
				baseUrl: 'https://' + instanceConfig.hostname + '/on/demandware.servlet/webdav/Sites/Cartridges/' + instanceConfig.version,
				uri: '/',
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
				requestOptions = getOpts();

			requestOptions.uri = '/' + filePath;
			requestOptions.method = 'PUT';

			promise = new Promise(function(resolve, reject) {
				requestObject = request(requestOptions, function(err, res, body) {
					if (err) {
						return reject(err);
					}

					resolve(body);
				});

				fs.createReadStream(filePath).pipe(requestObject);
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