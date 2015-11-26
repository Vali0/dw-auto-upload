(function() {
    'use strict';

    var config = require('./auploadConfig.json'),
        dwdav = require('./dwdav.js').getInstance(config),
        chokidar = require('chokidar'),
        watcher = chokidar.watch('.', {
            cwd: config.cwd
        });

    watcher.on('change', function(path) {
        dwdav.putFile(path).then(function(res) {
            console.log('File is successfully uploaded ' + res);
        }, function(err) {
            console.log(err);
        });
    });
}());