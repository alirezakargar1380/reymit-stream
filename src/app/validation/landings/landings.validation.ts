const Schema = require('validate');
const _ = require('lodash');
import log from "./../../utils/log.utility"
import Exception from "./../../utils/error.utility"

class Validate {
    private fields: {
        category: {
            match: RegExp;
            type: StringConstructor
            length: {
                min: number;
                max: number;
            }
        }
    };
    private errorMessages: { length: () => string; match: () => string; type: () => string; required: () => string; validation: () => string };
    private headerErrorMessages: { length: () => string; type: () => string; required: () => string; validation: () => string };

    constructor() {
        this.fields = {
            category: {
                type: String,
                match: /^[^<>%$#]*$/,
                length: {
                    min: 3,
                    max: 255,
                }
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


    checkCategory(items: any, throwErrors = true) {
        const schema = new Schema({
            category: _.assign({},
                this.fields.category, {
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