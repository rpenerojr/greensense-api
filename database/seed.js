'use strict';

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const prisma = new PrismaClient();

async function main () {
    bcrypt.hash('admin', saltRounds, async function (error, hash) {
        if (error) {
            throw new Error('An error occured while hashing the password');
        }

        const password = hash;

        await prisma.users.upsert({
            where: {
                id: 1
            },
            update: {},
            create: {
                email: 'admin@greensense.com',
                firstName: 'Super',
                lastName: 'Admin',
                phoneNumber: '+639000000000',
                password,
                privilege: 'admin',
                isVerified: true,
                verificationCode: 'seedValue'
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
