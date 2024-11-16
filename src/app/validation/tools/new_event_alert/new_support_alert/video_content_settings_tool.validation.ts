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
    IToolsNewSupportAlertVideoContentSettingsToolUpdateInput
} from "./../../../../shared/interfaces/tools/new_event_alert/tools.new_support_alert.video_content_settings_tool.interface"

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

    update(items: IToolsNewSupportAlertVideoContentSettingsToolUpdateInput, throwErrors = true) {

        const schema = new Schema({
            background_content_sponsor_profile: _.assign({}, {
                type: Object,
                required: true,
            }, {
                file_selection_method: { required: true, type: String, enum: _.values(file_selection_method_constant) },
                file_type: {
                    type: String,
                    required: items?.background_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                    enum: items?.background_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? [null] : _.values(file_type_constant),
                },
                link_or_name_of_file: {
                    required: items?.background_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                    type: String
                }
            }),

            content_below_sponsor_profile: _.assign({}, {
                type: Object,
                required: true,
            }, {
                file_selection_method: { required: true, type: String, enum: _.values(file_selection_method_constant) },
                file_type: {
                    type: String,
                    required: items?.content_below_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                    enum: items?.content_below_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? [null] : _.values(file_type_constant),
                },
                link_or_name_of_file: {
                    required: items?.content_below_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                    type: String
                }
            }),

            other_location_for_placemant_of_content: _.assign({}, {
                type: Object,
                required: true,
            }, {

                top_content_sponsor_profile: {
                    type: Object,
                    required: true,
                    file_selection_method: { required: true, type: String, enum: _.values(file_selection_method_constant) },
                    file_type: {
                        type: String,
                        required: items?.other_location_for_placemant_of_content?.top_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: items?.other_location_for_placemant_of_content?.top_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? [null] : _.values(file_type_constant),
                    },
                    link_or_name_of_file: {
                        required: items?.other_location_for_placemant_of_content?.top_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    },    
                },

                right_content_sponsor_profile: {
                    type: Object,
                    required: true,
                    file_selection_method: { required: true, type: String, enum: _.values(file_selection_method_constant) },
                    file_type: {
                        type: String,
                        required: items?.other_location_for_placemant_of_content?.right_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: items?.other_location_for_placemant_of_content?.right_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? [null] : _.values(file_type_constant),
                    },
                    link_or_name_of_file: {
                        required: items?.other_location_for_placemant_of_content?.right_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    },    
                },

                left_content_sponsor_profile: {
                    type: Object,
                    required: true,
                    file_selection_method: { required: true, type: String, enum: _.values(file_selection_method_constant) },
                    file_type: {
                        type: String,
                        required: items?.other_location_for_placemant_of_content?.left_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: items?.other_location_for_placemant_of_content?.left_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? [null] : _.values(file_type_constant),
                    },
                    link_or_name_of_file: {
                        required: items?.other_location_for_placemant_of_content?.left_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    },    
                },

                bottom_content_sponsor_profile: {
                    type: Object,
                    required: true,
                    file_selection_method: { required: true, type: String, enum: _.values(file_selection_method_constant) },
                    file_type: {
                        type: String,
                        required: items?.other_location_for_placemant_of_content?.bottom_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: items?.other_location_for_placemant_of_content?.bottom_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? [null] : _.values(file_type_constant),
                    },
                    link_or_name_of_file: {
                        required: items?.other_location_for_placemant_of_content?.bottom_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    },    
                },

            })
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