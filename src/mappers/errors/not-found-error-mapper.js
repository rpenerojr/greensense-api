'use strict';

module.exports = function () {
    return {
        message: 'Requested resource not found',
        detail: {
            type: 'ResourceNotFound',
            pointer: ''
        }
    }
};
