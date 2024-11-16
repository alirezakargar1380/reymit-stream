const Schema = require('validate');
const _ = require('lodash');
import log from "../../../utils/log.utility"
import Exception from "../../../utils/error.utility"

class Validate {
    private fields: {
        active: { 
            type: BooleanConstructor
        }
        show_target: { 
            type: BooleanConstructor
        }
        target_title: {
            type: StringConstructor
        }
        target_amount: {
            type: NumberConstructor
        }
        amount_until_now: {
            type: NumberConstructor
        }
    };
    private errorMessages: { 
        // length: () => string; 
        match: () => string; 
        type: () => string; 
        required: () => string; 
        validation: () => string 
        enum: () => string 
    };
    private headerErrorMessages: { 
        length: () => string; 
        type: () => string; 
        required: () => string; 
        validation: () => string 
    };

    constructor() {
        this.fields = {
            active: {
                type: Boolean,
            },
            show_target: {
                type: Boolean,
            },
            target_title: {
                type: String
            },
            target_amount: {
                type: Number
            },
            amount_until_now: {
                type: Number
            }
        };

        this.errorMessages = {
            required: () => 'ERROR_MESSAGE_REQUIRED',
            validation: () => 'ERROR_MESSAGE_INVALID',
            type: () => 'ERROR_MESSAGE_WRONG_TYPE',
            // length: () => 'ERROR_MESSAGE_INVALID_LENGTH',
            match: () => 'ERROR_MESSAGE_CANNOT_PASS_REGEX',
            enum: () => 'ERROR_MESSAGE_CANNOT_PASS_ENUM',
        };

        this.headerErrorMessages = {
            required: () => 'ERROR_MESSAGE_HEADER_REQUIRED',
            validation: () => 'ERROR_MESSAGE_INVALID',
            type: () => 'ERROR_MESSAGE_WRONG_TYPE',
            length: () => 'ERROR_MESSAGE_INVALID_LENGTH',
        };
    }

    update_main_settings(items: any, throwErrors = true) {
        const schema = new Schema({
            active: _.assign({},
                this.fields.active, {
                    required: true,
                },
            ),
            show_target: _.assign({},
                this.fields.show_target, {
                    required: true,
                },
            ),
            target_title: _.assign({},
                this.fields.target_title, {
                    required: true,
                    length: {
                        min: 3,
                        // max: 100,
                    },
                },
            ),
            target_amount: _.assign({},
                this.fields.target_amount, {
                    required: true,
                    size: {
                        min: 1000,
                    }
                },
            ),
            amount_until_now: _.assign({},
                this.fields.amount_until_now, {
                    required: true,
                },
            ),
        });

        schema.message(this.errorMessages);

        return this.sanitizeErrors(
            schema.validate(_.assign({}, items)),
            throwErrors,
        );
    }

    sanitizeErrors(errors: any, throwErrors: boolean) {

        const errs = _.map(
            errors,
            (error: any) => ({
                [error.path]: error.message
            }),
        );

        if (_.size(errs)) {
            log.error(`Validation failed, ${JSON.stringify(errs)}`);

            if (throwErrors) {
                throw Exception.setError(errs, throwErrors);
            }
        }

        return errs;
    }
}

export default new Validate();