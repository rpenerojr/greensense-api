const privileges = require('./../privilege');

module.exports = {
    type: 'object',
    properties: {
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        email: {
            type: 'string',
            format: 'email'
        },
        phoneNumber: {
            type: 'string',
            pattern: "\[\+63\]\\d\{12\}"
        },
        password: {
            type: 'string'
        },
        privilege: {
            type: 'string',
            enum: privileges
        }
    },
    required: [
        'email',
        'password',
        'privilege'
    ]
}
