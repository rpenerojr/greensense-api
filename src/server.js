'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { globSync } = require('glob')

class Server {
    constructor (config) {
        this.config = config;
        this.app = express();

        this.loadMiddlewares();
        this.loadRoutes();
    }

    loadMiddlewares () {
        // @todo: Add cors
        this.app.use(helmet());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json());
    }

    loadRoutes () {
        const files = globSync('src/routes/**/*.js');

        files.forEach((routeFile) => {
            const Route = require(`../${routeFile}`);
            new Route(this.app, this.config);
        });
    }

    start () {
        this.app.listen(this.config.port, () => {
            console.info(`Server has started at port ${this.config.port}`);
        });
    }

    exit () {
        this.app.close();
    }
}

module.exports = Server;
