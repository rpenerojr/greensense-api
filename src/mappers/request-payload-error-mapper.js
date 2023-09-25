'use strict';

module.exports = function (error) {
    return {
        message: error.message,
        detail: {
            type: 'RequestPayloadError',
            pointer: error.params.missingProperty
        }
    }
};
