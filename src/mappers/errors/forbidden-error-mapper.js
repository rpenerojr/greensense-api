'use strict';

class ForbiddenErrorMapper{
    map() {
        return {
            error: {
                message: 'Forbidden',
                keyword: 'forbidden',
                errorPointer: ''
            }
        };
    }
}

module.exports = ForbiddenErrorMapper;
