const Schema = require('validate');
const _ = require('lodash');
import log from "./../../utils/log.utility"
import Exception from "./../../utils/error.utility"
import { ObjectId } from "mongodb";
const isObjectId = (val: string) => ObjectId.isValid(val)

class Validate {
    private fields: {
        package: { type: StringConstructor, use: {} }
        code: { type: StringConstructor }
        status: {
            match: RegExp;
            type: StringConstructor
        }
        token: { type: StringConstructor }
    };
    private errorMessages: { length: () => string; match: () => string; type: () => string; required: () => string; validation: () => string };
    private headerErrorMessages: { length: () => string; type: () => string; required: () => string; validation: () => string };

    constructor() {
        this.fields = {
            package: {
                type: String,
                use: { isObjectId }
            },
            code: {
                type: String,
            },
            status: {
                type: String,
                match: /^\d+$/
            },
            token: {
                type: String,
            }
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

    active_code_package(items: any, throwErrors = true) {
        const schema = new Schema({
            code: _.assign({},
                this.fields.code, {
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

    active_trial_package(items: any, throwErrors = true) {
        const schema = new Schema({
            package: _.assign({},
                this.fields.package, {
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

    buy_package(items: any, throwErrors = true) {
        const schema = new Schema({
            package: _.assign({},
                this.fields.package, {
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

    bought_package(items: any, throwErrors = true) {
        const schema = new Schema({
            status: _.assign({},
                this.fields.status, {
                    required: true,
                },
            ),
            token: _.assign({},
                this.fields.token, {
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