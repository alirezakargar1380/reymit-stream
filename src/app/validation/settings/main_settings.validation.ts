const Schema = require('validate');
const _ = require('lodash');
import log from "../../utils/log.utility"
import Exception from "../../utils/error.utility"

class Validate {
    private fields: {
        minimum_amount_of_support: { 
            type: NumberConstructor
        }
        maximux_amount_of_support: {
            type: NumberConstructor
        }
        reqirement_data: {
            type: ObjectConstructor
        }
        deposit_support_to_id: {
            type: StringConstructor
        }
    };
    private errorMessages: { 
        length: () => string; 
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
            minimum_amount_of_support: {
                type: Number,
            },
            maximux_amount_of_support: {
                type: Number,
            },
            reqirement_data: {
                type: Object
            },
            deposit_support_to_id: {
                type: String
            }
        };

        this.errorMessages = {
            required: () => 'ERROR_MESSAGE_REQUIRED',
            validation: () => 'ERROR_MESSAGE_INVALID',
            type: () => 'ERROR_MESSAGE_WRONG_TYPE',
            length: () => 'ERROR_MESSAGE_INVALID_LENGTH',
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
            minimum_amount_of_support: _.assign({},
                this.fields.minimum_amount_of_support, {
                    required: true,
                    size: { 
                        min: 0,
                        max: items.maximux_amount_of_support
                    },
                },
            ),
            currency_support: {
                type: Boolean,
            },
            filter_unauthorized_words: {
                type: Boolean,
            },
            need_confirm_the_phone_number_before_payment: {
                type: Boolean,
            },
            maximux_amount_of_support: _.assign({},
                this.fields.maximux_amount_of_support, {
                    required: true,
                    size: { 
                        min: items.maximux_amount_of_support,
                        max: 50000000
                    }
                },
            ),
            deposit_support_to_id:  _.assign({},
                this.fields.deposit_support_to_id, {
                    required: true,
                    enum: ['self', 'charity']
                },
            ),
            gateways: {
                require: true,
                zarinpal: {
                    code: {
                        type: String,
                        required: true,
                    },
                    is_default: {
                        type: Boolean,
                        required: true,
                    },
                },
                idpay: {
                    code: {
                        type: String,
                        required: true,
                    },
                    is_default: {
                        type: Boolean,
                        required: true,
                    },
                },
                pardakhtpay: {
                    code: {
                        type: String,
                        required: true,
                    },
                    is_default: {
                        type: Boolean,
                        required: true,
                    },
                },
                payping: {
                    code: {
                        type: String,
                        required: true,
                    },
                    is_default: {
                        type: Boolean,
                        required: true,
                    },
                },
            },
            reqirement_data: _.assign({},
                this.fields.reqirement_data, {
                    required: true,
                    name: {
                        type: Boolean,
                        required: true,
                    },
                    details: {
                        type: Boolean,
                        required: true,
                    },
                    support_list: {
                        type: Boolean,
                        required: true,
                    },
                    phone_number: {
                        type: Boolean,
                        required: true,
                    },
                    email: {
                        type: Boolean,
                        required: true,
                    },
                    terms_and_conditions: {
                        type: Boolean,
                        required: true,
                    },
                    gift: {
                        type: Boolean,
                        required: true,
                    },
                    show_target: {
                        type: Boolean,
                        required: true,
                    },
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