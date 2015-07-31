'use strict';

var config = {
    hostname: 'westum08-alliance-prtnr-eu03-dw.demandware.net',
    username: 'vradev',
    password: 'Qwer1234!',
    version: 'LATEST'
};

var dwdav = require('./dwdav.js').getInstance(config),
    fs = require('fs'),
    chokidar = require('chokidar'),
    CWD = 'SiteGenesis';

var watcher = chokidar.watch('.', {
    cwd: CWD
});

watcher.on('change', function(path, stats) {
    dwdav.putFile(CWD + '/' + path);
});