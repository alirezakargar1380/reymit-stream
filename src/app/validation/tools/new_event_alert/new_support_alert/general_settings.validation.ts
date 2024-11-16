const Schema = require('validate');
const _ = require('lodash');
import log from "../../../../utils/log.utility"
import Exception from "../../../../utils/error.utility"

import { file_selection_method_constant } from "../../../../shared/constants/schemas/tools/tools.file_selection_method.constant"
import {
    file_type_constant
} from "../../../../shared/constants/schemas/tools/tools.file_type.constant"

// INTEFACE
import {
    IToolsNewSupportAlertGeneralSettingsUpdateInput
} from "./../../../../shared/interfaces/tools/new_event_alert/tools.new_support_alert.general_settings"

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

    update(items: IToolsNewSupportAlertGeneralSettingsUpdateInput, throwErrors = true) {

        const schema = new Schema({
            new_donate_alert_sound: _.assign({}, {
                type: Object,
                required: true,
            }, {
                file_selection_method: { required: true, type: String, enum: _.values(file_selection_method_constant) },
                link_or_name_of_file: {
                    required: items?.new_donate_alert_sound?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                    type: String
                },
                sound_volume: {
                    required: items?.new_donate_alert_sound?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                    type: Number,
                    size: { min: 0, max: 100 }
                },
            }),

            timing: _.assign({}, {
                type: Object,
                required: true,
            }, {
                alert_show_time: { required: true, type: Number },
                alert_delay_time: { required: true, type: Number },
                show_delay_sponser_details: { required: true, type: Number },
            }),

            sponser_descreption: _.assign({}, {
                type: Object,
                required: true,
            }, {
                show_sponser_description: { required: true, type: Boolean },
            }),

            video_content: _.assign({}, {
                type: Object,
                required: true,
            }, {
                limit_the_height_and_width_of_video_content: { required: true, type: Boolean },
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