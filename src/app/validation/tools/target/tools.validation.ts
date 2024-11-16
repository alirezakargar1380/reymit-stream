const Schema = require('validate');
const _ = require('lodash');
import log from "./../../../utils/log.utility"
import Exception from "./../../../utils/error.utility"

// import { EUserUploaderActivitesSections } from "./../../../shared/interfaces/user_uploader_activites.iterface";
import { file_type_constant } from "./../../../shared/constants/schemas/tools/tools.file_type.constant"
import { EUserUploaderActivitesSectionsTypes } from "../../../shared/interfaces/user_uploader_activites.iterface";

class Validate {
    private errorMessages: {
        length: () => string;
        match: () => string;
        type: () => string;
        required: () => string;
        validation: () => string
        // enum: () => string
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
            // enum: () => 'ERROR_MESSAGE_CANNOT_PASS_ENUM',
        };

        this.headerErrorMessages = {
            required: () => 'ERROR_MESSAGE_HEADER_REQUIRED',
            validation: () => 'ERROR_MESSAGE_INVALID',
            type: () => 'ERROR_MESSAGE_WRONG_TYPE',
            length: () => 'ERROR_MESSAGE_INVALID_LENGTH',
        };
    }

    upload_files(items: any, throwErrors = true) {

        const schema = new Schema({

            // section: _.assign({}, {
            //     type: String,
            //     required: true,
            //     enum: _.values(EUserUploaderActivitesSections)
            // }),

            file_type: _.assign({}, {
                type: String,
                required: true,
                enum: _.values(EUserUploaderActivitesSectionsTypes)
            }),

        })

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