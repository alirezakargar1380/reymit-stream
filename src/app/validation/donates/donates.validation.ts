const Schema = require('validate');
const _ = require('lodash');
import log from "./../../utils/log.utility"
import Exception from "./../../utils/error.utility"

class Validate {
    private fields: {
        Page: {
            type: StringConstructor
            match: RegExp;
        }
        displayName: {
            match: RegExp;
            type: StringConstructor
        }
        paymentMethod: {
            type: StringConstructor
        }
        dateFrom: {
            type: StringConstructor
        }
        dateTo: {
            type: StringConstructor
        }
        amountFrom: {
            type: StringConstructor
            match: RegExp;
        }
        amountTo: {
            type: StringConstructor
            match: RegExp;
        }
        publishName: {
            type: StringConstructor
        }
        publishDesc: {
            type: StringConstructor
        }
        publishNameInDonatorList: {
            type: StringConstructor
        }
    };
    private errorMessages: { length: () => string; match: () => string; type: () => string; required: () => string; validation: () => string };
    private headerErrorMessages: { length: () => string; type: () => string; required: () => string; validation: () => string };

    constructor() {
        this.fields = {
            Page: {
                type: String,
                match: /[0-9]/
            },
            displayName: {
                type: String,
                match: /^[^<>%$#]*$/,
            },
            paymentMethod: {
                type: String,
            },
            dateFrom: {
                type: String,
            },
            dateTo: {
                type: String,
            },
            amountFrom: {
                type: String,
                match: /[0-9]/
            },
            amountTo: {
                type: String,
                match: /[0-9]/
            },
            publishName: {
                type: String,
            },
            publishDesc: {
                type: String,
            },
            publishNameInDonatorList: {
                type: String,
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


    get_donates_filter(items: any, throwErrors = true) {
        const schema = new Schema({
            Page: _.assign({},
                this.fields.Page, {
                    required: true
                },
            ),
            displayName: _.assign({},
                this.fields.displayName, {
                    required: false
                },
            ),
            paymentMethod: _.assign({},
                this.fields.paymentMethod, {
                    required: false
                },
            ),
            dateFrom: _.assign({},
                this.fields.dateFrom, {
                    required: false
                },
            ),
            dateTo: _.assign({},
                this.fields.dateTo, {
                    required: false
                },
            ),
            amountFrom: _.assign({},
                this.fields.amountFrom, {
                    required: false
                },
            ),
            amountTo: _.assign({},
                this.fields.amountTo, {
                    required: false
                },
            ),
            publishName: _.assign({},
                this.fields.publishName, {
                    required: false
                },
            ),
            publishDesc: _.assign({},
                this.fields.publishDesc, {
                    required: false
                },
            ),
            publishNameInDonatorList: _.assign({},
                this.fields.publishNameInDonatorList, {
                    required: false
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