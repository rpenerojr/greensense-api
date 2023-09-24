'use strict'

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');

class LoginController {
    constructor (params, config) {
        this.params = params;
        this.config = config;

        this.prisma = new PrismaClient();
    }

    process (cb) {
        cb(null, {});
    }
}

module.exports = LoginController;
