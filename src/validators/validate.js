'use strict';

const Ajv = require('ajv');
const ajv = new Ajv();

module.exports = function (payload, schema) {
    const validator = ajv.compile(schema);
    if (!validator(payload)) {
        return {
            isValid: false,
            errors: validator.errors
        };
    }

    return {
        isValid: true,
        errors: []
    };
};
