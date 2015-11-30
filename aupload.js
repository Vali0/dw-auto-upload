(function() {
    'use strict';

    var COLORS = {
        GREEN: '\x1b[32m',
        WHITE: '\x1b[37m',
        RED: '\x1b[31m'
    };

    var config = require('./auploadConfig.json'),
        dwdav = require('./dwdav.js').getInstance(config),
        chokidar = require('chokidar'),
        watcher = chokidar.watch('.', {
            cwd: config.cwd
        });

    watcher.on('change', function(path) {
        dwdav.putFile(path).then(function(response) {
            console.log(COLORS.GREEN + "[OK]" + COLORS.WHITE, path);
        }, function(error) {
            console.log(COLORS.RED + "[ERROR]", COLORS.WHITE + path, "\n" + error);
        });
    });
}());