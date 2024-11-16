const Schema = require('validate');
const _ = require('lodash');
import log from "../../utils/log.utility"
import Exception from "../../utils/error.utility"

class Validate {
    private fields: {
        emoji: {
            type: StringConstructor
            enum: string[]
        }
        profile_image: {
            type: StringConstructor
            enum: string[]
        }
        ticket_file: { 
            type: StringConstructor
            enum: string[]
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
            emoji: {
                type: String,
                enum: ['image/gif', 'image/png'],
            },
            profile_image: {
                type: String,
                enum: ['image/jpeg', 'image/png'],
            },
            ticket_file: {
                type: String,
                enum: ['application/pdf', 'application/zip', 'image/jpeg', 'image/png'],
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

    emoji(items: any, throwErrors = true) {
        const schema = new Schema({
            mimetype: _.assign({},
                this.fields.emoji, {
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

    update_profile(items: any, throwErrors = true) {
        const schema = new Schema({
            mimetype: _.assign({},
                this.fields.profile_image, {
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

    update_gateway_profile(items: any, throwErrors = true) {
        const schema = new Schema({
            mimetype: _.assign({},
                this.fields.profile_image, {
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

    ticket_file(items: any, throwErrors = true) {
        const schema = new Schema({
            mimetype: _.assign({},
                this.fields.ticket_file, {
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