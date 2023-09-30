'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');

class LoginController {
    constructor (params) {
        this.params = params;

        this.prisma = new PrismaClient();
    }

    async process (cb) {
        const user = await this.prisma.users.findFirst({
            where: {
                email: this.params.email,
                privilege: this.params.privilege
            }
        });

        if(!user) {
            cb(new Error('Invalid login credentials'), null);
        }

        if (bcrypt.compareSync(this.params.password, user.password)) {
            const webtoken = jwt.sign(user, process.env.SECRET_KEY);
            return cb(null, {
                token: webtoken
            });
        }

        cb(new Error('Invalid login credentials'), null);
    }
}

module.exports = LoginController;
