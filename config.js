'use strict';

(require('dotenv')).config();

const {
    NODE_ENV,
    PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT
} = process.env

module.exports = {
    nodeEnv: NODE_ENV || 'development',
    port: PORT || 3000
}
