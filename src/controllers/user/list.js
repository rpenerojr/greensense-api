'use strict'

const { PrismaClient } = require('@prisma/client');

class ListController {
    constructor () {
        this.prisma = new PrismaClient();
    }

    async process (cb) {
        const users = await this.prisma.users.findMany();
        cb(null, users);
    }
}

module.exports = ListController;
