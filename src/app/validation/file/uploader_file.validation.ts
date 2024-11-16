const Schema = require('validate');
const _ = require('lodash');
import log from "../../utils/log.utility"
import Exception from "../../utils/error.utility"

class Validate {

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
            mimetype: _.assign({}, {
                    required: true,
                    enum: ['image/gif', 'image/png', 'image/jpeg']
                },
            ),
        });

        schema.message(this.errorMessages);

        return this.sanitizeErrors(
            schema.validate(_.assign({}, items)),
            throwErrors,
        );
    }

    audio(items: any, throwErrors = true) {

        const schema = new Schema({
            mimetype: _.assign({}, {
                    required: true,
                    enum: ['audio/mpeg', 'audio/ogg']
                },
            ),
        });

        schema.message(this.errorMessages);

        return this.sanitizeErrors(
            schema.validate(_.assign({}, items)),
            throwErrors,
        );
    }

    image(items: any, throwErrors = true) {

        const schema = new Schema({
            mimetype: _.assign({}, {
                    required: true,
                    enum: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/bmp', 'image/gif']
                },
            ),
        });

        schema.message(this.errorMessages);

        return this.sanitizeErrors(
            schema.validate(_.assign({}, items)),
            throwErrors,
        );
    }

    video(items: any, throwErrors = true) {

        const schema = new Schema({
            mimetype: _.assign({}, {
                    required: true,
                    enum: ['video/mp4', 'video/ogg', 'video/webm']
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