const Schema = require('validate');
const _ = require('lodash');
import log from "./../../utils/log.utility"
import Exception from "./../../utils/error.utility"
import { ObjectId } from "mongodb";
const isObjectId = (val: string) => ObjectId.isValid(val)

class Validate {
    private fields: {
        title: {
            match: RegExp;
            type: StringConstructor
            length: {
                min: number;
                max: number;
            }
        }
        price: {
            type: StringConstructor
            match: RegExp;
        }
        animationStyle: {
            type: StringConstructor
        }
        animationSpeed: {
            type: StringConstructor
        }
        animationCount: {
            type: StringConstructor
        }
    };
    private errorMessages: { length: () => string; match: () => string; type: () => string; required: () => string; validation: () => string };
    private headerErrorMessages: { length: () => string; type: () => string; required: () => string; validation: () => string };

    constructor() {
        this.fields = {
            title: {
                type: String,
                match: /^[^<>%$#]*$/,
                length: {
                    min: 3,
                    max: 255,
                }
            },
            price: {
                type: String,
                match: /[0-9]/
            },
            animationStyle: {
                type: String,
            },
            animationSpeed: {
                type: String,
            },
            animationCount: {
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


    create(items: any, throwErrors = true) {
        const schema = new Schema({
            title: _.assign({},
                this.fields.title, {
                    required: true
                },
            ),
            price: _.assign({},
                this.fields.price, {
                    required: true
                },
            ),
            animationStyle: _.assign({},
                this.fields.animationStyle, {
                    required: true
                },
            ),
            animationSpeed: _.assign({},
                this.fields.animationSpeed, {
                    required: true
                },
            ),
            animationCount: _.assign({},
                this.fields.animationCount, {
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

    update(items: any, throwErrors = true) {
        const schema = new Schema({
            id: _.assign({},
                {
                    required: true,
                    use: { isObjectId }
                }
            ),
            title: _.assign({},
                this.fields.title, {
                    required: true
                },
            ),
            price: _.assign({},
                this.fields.price, {
                    required: true
                },
            ),
            animationStyle: _.assign({},
                this.fields.animationStyle, {
                    required: true
                },
            ),
            animationSpeed: _.assign({},
                this.fields.animationSpeed, {
                    required: true
                },
            ),
            animationCount: _.assign({},
                this.fields.animationCount, {
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

    delete(items: any, throwErrors = true) {
        const schema = new Schema({
            id: _.assign({},
                {
                    required: true,
                    use: { isObjectId }
                }
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