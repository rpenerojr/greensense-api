'use strict';

const Ajv = require('ajv');
const ajv = new Ajv();

module.exports = function (payload, schema) {
    const validator = ajv.compile(schema);
    if (!validator(payload)) {
        return validator.errors[0];
    }

    return true;
};
