const Schema = require('validate');
const _ = require('lodash');
import log from "./../../utils/log.utility"
import Exception from "./../../utils/error.utility"

class Validate {
    private fields: {
        password: { 
            type: StringConstructor,
            length: {
                min: number;
                max: number;
            }
        }
        name: {
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
        displayName: {
            match: RegExp;
            type: StringConstructor
            length: {
                min: number;
                max: number;
            }
        }
        username: {
            match: RegExp;
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
        phoneNumber: {
            match: RegExp;
            type: StringConstructor
            length: {
                min: number;
                max: number;
            }
        }
        code: {
            match: RegExp;
            type: StringConstructor
            length: {
                min: number;
                max: number;
            }
        }
        has_accepted_terms: {
            type: BooleanConstructor
        }
    };
    private errorMessages: { length: () => string; match: () => string; type: () => string; required: () => string; validation: () => string };
    private headerErrorMessages: { length: () => string; type: () => string; required: () => string; validation: () => string };

    constructor() {
        this.fields = {
            name: {
                type: String,
                match: /^[^<>%$#]*$/,
                length: {
                    min: 3,
                    max: 255,
                }
            },
            username: {
                type: String,
                match: /^[^<>%$#]*$/,
                length: {
                    min: 3,
                    max: 255,
                }
            },
            email: {
                type: String,
                match: /[a-z0-9]+(@yahoo.com|@gmail.com|@outlook.com)/
            },
            password: {
                type: String,
                length: {
                    min: 8,
                    max: 100,
                }
            },
            displayName: {
                type: String,
                match: /^[^<>%$#]*$/,
                length: {
                    min: 3,
                    max: 255,
                }
            },
            gatewayAddress: {
                type: String,
                match: /^[^<>%$#]*$/
            },
            has_accepted_terms: {
                type: Boolean
            },
            phoneNumber: {
                type: String,
                match: /[0-9]/,
                length: {
                    min: 10,
                    max: 12,
                }
            },
            code: {
                type: String,
                match: /^\d{6}$/,
                length: {
                    min: 6,
                    max: 6,
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

    check_email(items: any, throwErrors = true) {
        const schema = new Schema({
            email: _.assign({},
                this.fields.email, {
                    required: true,
                },
            )
        });

        schema.message(this.errorMessages);

        return this.sanitizeErrors(
            schema.validate(_.assign({}, items)),
            throwErrors,
        );
    }

    email_login(items: any, throwErrors = true) {
        const schema = new Schema({
            email: _.assign({},
                this.fields.email, {
                    required: true,
                },
            ),
            password: _.assign({},
                this.fields.password, {
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

    register(items: any, throwErrors = true) {
        const schema = new Schema({
            name: _.assign({},
                this.fields.name, {
                    type: String,
                    required: true,
                },
            ),
            password: _.assign({},
                this.fields.password, {
                    required: true
                },
            ),
            confirm_password: _.assign({},
                this.fields.password, {
                    required: true
                },
            ),
            phoneNumber: _.assign({},
                this.fields.phoneNumber, {
                    required: true
                },
            ),
            displayName: _.assign({},
                this.fields.displayName, {
                    required: true
                },
            ),
            username: _.assign({},
                this.fields.username, {
                    required: true
                },
            ),
            has_accepted_terms: _.assign({},
                this.fields.has_accepted_terms, {
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

    forget_password(items: any, throwErrors = true) {
        const schema = new Schema({
            email: _.assign({},
                this.fields.email, {
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

    edit_info(items: any, throwErrors = true) {
        const schema = new Schema({
            displayName: _.assign({},
                this.fields.displayName, {
                    required: true
                },
            ),
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

    edit_password(items: any, throwErrors = true) {
        const schema = new Schema({
            currentPassword: _.assign({},
                this.fields.password, {
                    required: true
                },
            ),
            newPassword1: _.assign({},
                this.fields.password, {
                    required: true
                },
            ),
            newPassword2: _.assign({},
                this.fields.password, {
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

    edit_phone_number(items: any, throwErrors = true) {
        const schema = new Schema({
            phoneNumber: _.assign({},
                this.fields.phoneNumber, {
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

    verify_edit_phone_number(items: any, throwErrors = true) {
        const schema = new Schema({
            phoneNumber: _.assign({},
                this.fields.phoneNumber, {
                    required: true
                },
            ),
            code: _.assign({},
                this.fields.code, {
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

    edit_email(items: any, throwErrors = true) {
        const schema = new Schema({
            email: _.assign({},
                this.fields.email, {
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

    verify_edit_email(items: any, throwErrors = true) {
        const schema = new Schema({
            email: _.assign({},
                this.fields.email, {
                    required: true
                },
            ),
            code: _.assign({},
                this.fields.code, {
                    required: true
                },
            ),
        });
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