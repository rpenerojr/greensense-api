'use strict';

class UnauthorizedErrorMapper{
    map() {
        return {
            error: {
                message: 'Invalid credentials error',
                keyword: 'invalid_credentials',
                errorPointer: ''
            }
        };
    }
}

module.exports = UnauthorizedErrorMapper;
