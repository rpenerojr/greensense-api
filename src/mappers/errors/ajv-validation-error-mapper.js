'use strict';

class AjvValidationErrorMapper{
    constructor(ajvValidation) {
        this.ajvValidation = ajvValidation;
    }

    map() {
        const validationError = this.ajvValidation.errors[0];

        const pointer = validationError.params.missingProperty ||
                            validationError.instancePath || '';

        return {
            error: {
                message: validationError.message,
                keyword: validationError.keyword,
                errorPointer: pointer
            }
        };
    }
}

module.exports = AjvValidationErrorMapper;
