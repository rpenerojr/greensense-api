'use strict';

const config = require('./config');
const Server = require('./src/server');

let server;

process.on('SIGTERM', function () {
    if (server) {
        server.close();
    }
});

server = new Server(config);
server.start();
