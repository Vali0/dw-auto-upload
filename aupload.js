(function() {
    'use strict';

    var config = require('./auploadConfig.json'),
        dwdav = require('./dwdav.js').getInstance(config),
        fs = require('fs'),
        chokidar = require('chokidar'),
        watcher = chokidar.watch('.', {
            cwd: config.cwd
        });

    watcher.on('change', function(path, stats) {
        dwdav.putFile(config.cwd + '/' + path).then(function(res) {
            console.log('Cartridge file successfully uploaded ' + res);
        }, function(err) {
            console.log(err);
        });
    });
}());