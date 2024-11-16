const Schema = require('validate');
const _ = require('lodash');
import log from "./../../utils/log.utility"
import Exception from "./../../utils/error.utility"

class Validate {
    private fields: {
        amount_irr: {
            type: NumberConstructor
        }
        displayName: {
            match: RegExp;
            type: StringConstructor
            length: {
                min: number;
                max: number;
            }
        }
        email: {
            match: RegExp;
            type: StringConstructor
        }
        phoneNumber: {
            match: RegExp;
            type: StringConstructor
            length: {
                min: number;
                max: number;
            }
        }
        desc: {
            type: StringConstructor
            length: {
                min: number;
                max: number;
            }
        }
        gatewayAddress: {
            match: RegExp;
            type: StringConstructor
        }
        publishName: {
            type: BooleanConstructor
        }
        publishDesc: {
            type: BooleanConstructor
        }
        publishNameInDonatorList: {
            type: BooleanConstructor
        }
        has_accepted_terms: {
            type: BooleanConstructor
        }
    };
    private errorMessages: { length: () => string; match: () => string; type: () => string; required: () => string; validation: () => string };
    private headerErrorMessages: { length: () => string; type: () => string; required: () => string; validation: () => string };

    constructor() {
        this.fields = {
            amount_irr: {
                type: Number,
            },
            email: {
                type: String,
                match: /[a-z0-9]+(@yahoo.com|@gmail.com|@outlook.com)/
            },
            displayName: {
                type: String,
                match: /^[^<>%$#]*$/,
                length: {
                    min: 3,
                    max: 255,
                }
            },
            phoneNumber: {
                type: String,
                match: /[0-9]/,
                length: {
                    min: 10,
                    max: 12,
                }
            },
            desc: {
                type: String,
                length: {
                    min: 3,
                    max: 255,
                }
            },
            gatewayAddress: {
                type: String,
                match: /^[^<>%$#]*$/,
            },
            publishName: {
                type: Boolean,
            },
            publishDesc: {
                type: Boolean,
            },
            publishNameInDonatorList: {
                type: Boolean,
            },
            has_accepted_terms: {
                type: Boolean,
            },

        };

        this.errorMessages = {
            required: () => 'ERROR_MESSAGE_REQUIRED',
            validation: () => 'ERROR_MESSAGE_INVALID',
            type: () => 'ERROR_MESSAGE_WRONG_TYPE',
            length: () => 'ERROR_MESSAGE_INVALID_LENGTH',
            match: () => 'ERROR_MESSAGE_CANNOT_PASS_REGEX'
        };

        this.headerErrorMessages = {
            required: () => 'ERROR_MESSAGE_HEADER_REQUIRED',
            validation: () => 'ERROR_MESSAGE_INVALID',
            type: () => 'ERROR_MESSAGE_WRONG_TYPE',
            length: () => 'ERROR_MESSAGE_INVALID_LENGTH',
        };
    }


    donate(items: any, throwErrors = true) {
        const schema = new Schema({
            amount_irr: _.assign({},
                this.fields.amount_irr, {
                    required: true
                },
            ),
            email: _.assign({},
                this.fields.email, {
                    required: false
                },
            ),
            displayName: _.assign({},
                this.fields.displayName, {
                    required: false
                },
            ),
            phoneNumber: _.assign({},
                this.fields.phoneNumber, {
                    required: false
                },
            ),
            desc: _.assign({},
                this.fields.desc, {
                    required: false
                },
            ),
            publishName: _.assign({},
                this.fields.publishName, {
                    required: true
                },
            ),
            publishDesc: _.assign({},
                this.fields.publishDesc, {
                    required: true
                },
            ),
            publishNameInDonatorList: _.assign({},
                this.fields.publishNameInDonatorList, {
                    required: true
                },
            ),
            has_accepted_terms: _.assign({},
                this.fields.has_accepted_terms, {
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

    check_gateway_address(items: any, throwErrors = true) {
        const schema = new Schema({
            gatewayAddress: _.assign({},
                this.fields.gatewayAddress, {
                    required: true
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