const Schema = require('validate');
const _ = require('lodash');
import log from "../../../../utils/log.utility"
import Exception from "../../../../utils/error.utility"

import {
    horizonal_position_constant,
    vertical_position_constant
} from "../../../../shared/constants/schemas/tools/new_event_alert/position.constant"

// INTEFACE
import {
    IToolsNewSupportAlertAppearanceSettingsUpdateInput
} from "../../../../shared/interfaces/tools/new_event_alert/appearance_settings.interface"

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

    update(items: IToolsNewSupportAlertAppearanceSettingsUpdateInput, throwErrors = true) {

        const schema = new Schema({

            appearance_profile_of_the_sponsor_profile_box: _.assign({}, {
                type: Object,
                required: true,
            }, {
                vertical_position_of_the_sponsor_profile_box: { required: true, type: String, enum: _.values(vertical_position_constant) },
                horizonal_position_of_the_sponsor_profile_box: { required: true, type: String, enum: _.values(horizonal_position_constant) },
                padding_top: { required: true, type: Number },
                padding_right: { required: true, type: Number },
                padding_bottom: { required: true, type: Number },
                padding_left: { required: true, type: Number },
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