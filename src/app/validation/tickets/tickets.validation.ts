const Schema = require('validate');
const _ = require('lodash');
import log from "../../utils/log.utility"
import Exception from "../../utils/error.utility"

class Validate {
    private fields: {
        ticket_id: { 
            type: StringConstructor,
            match: RegExp
        }
        page_number: { 
            type: StringConstructor,
            match: RegExp
        }
        subject: { 
            type: StringConstructor,
            match: RegExp
        }
        description: { 
            type: StringConstructor,
            // match: RegExp,
            length: {
                min: Number,
                max: Number
            }
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
            ticket_id: {
                type: String,
                match: /^[a-z0-9]*$/
            },
            page_number: {
                type: String,
                match: /^[0-9]*$/
            },
            subject: {
                type: String,
                match: /^[a-zA-Z0-9\u0600-\u06FF\s]*$/
            },
            description: {
                type: String,
                length: {
                    min: 10,
                    max: 1000,
                }
                // match: /^[a-zA-Z0-9]*$/
            },
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

    get_tickets_messages(items: any, throwErrors = true) {
        const schema = new Schema({
            ticket_id: _.assign({},
                this.fields.ticket_id, {
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

    reply_ticket_by_user(items: any, throwErrors = true) {
        const schema = new Schema({
            ticket_id: _.assign({},
                this.fields.ticket_id, {
                    required: true,
                },
            ),
            description: _.assign({},
                this.fields.description, {
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

    reply_ticket_by_admin(items: any, throwErrors = true) {
        const schema = new Schema({
            ticket_id: _.assign({},
                this.fields.ticket_id, {
                    required: true,
                },
            ),
            description: _.assign({},
                this.fields.description, {
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

    get_tickets(items: any, throwErrors = true) {
        const schema = new Schema({
            page_number: _.assign({},
                this.fields.page_number, {
                    required: false,
                },
            ),
            subject: _.assign({},
                this.fields.subject, {
                    required: false,
                    length: {
                        min: 0,
                        max: 100,
                    }
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