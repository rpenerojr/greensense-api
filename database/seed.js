'use strict';

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const config = require('./../config');

const prisma = new PrismaClient();

async function main () {
    bcrypt.hash('admin', 10, async function (error, hash) {
        if (error) {
            throw new Error('An error occured while hashing the password');
        }

        const password = hash;

        const admin = await prisma.users.upsert({
            where: {
                id: 1
            },
            update: {},
            create: {
                email: 'admin@greensense.com',
                firstName: 'Super',
                lastName: 'Admin',
                password,
                privilege: 'admin'
            }
        });
    });
}

main().then(async function () {
    await prisma.$disconnect();
}).catch(async function (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
