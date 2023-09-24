'use strict';

(require('dotenv')).config();

const {
    NODE_ENV,
    PORT
} = process.env

module.exports = {
    nodeEnv: NODE_ENV || 'development',
    port: PORT || 3000
}
