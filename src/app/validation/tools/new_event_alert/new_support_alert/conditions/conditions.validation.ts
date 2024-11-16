const Schema = require('validate');
const _ = require('lodash');
import log from "./../../../../../utils/log.utility"
import Exception from "./../../../../../utils/error.utility"
const isObjectId = (val: string) => ObjectId.isValid(val)

import {
    change_status_of_this_section_for_this_condition
} from "./../../../../../shared/constants/schemas/tools/new_event_alert/new_support_alert/change_status_of_this_section_for_this_condition.constants"
import { file_selection_method_constant } from "./../../../../../shared/constants/schemas/tools/tools.file_selection_method.constant"
import { file_type_constant } from "./../../../../../shared/constants/schemas/tools/tools.file_type.constant"
import {send_emoji_placemants_constant} from "./../../../../../shared/constants/schemas/tools/new_event_alert/send_emoji_placemants.constant"
import {
    conditions_enums
} from "./../../../../../shared/constants/schemas/tools/new_event_alert/new_support_alert/conditions.constant"

// INTEFACE
import {
    IToolsNewDonationConditionsCreated
} from "./../../../../../shared/interfaces/tools/new_event_alert/new_support_alert/conditions.interface"
import { ObjectId } from "mongodb";

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

    create(items: IToolsNewDonationConditionsCreated, throwErrors = true) {
        const schema = new Schema({
            user_id: _.assign({}, {
                type: ObjectId,
                required: true
            }),
            type_of_conditions: _.assign({}, {
                type: String,
                required: true,
                enum: _.values(conditions_enums)
            }),
            amount: _.assign({}, {
                type: Number,
                required: true
            }),
            general_settings: _.assign({}, {
                type: Object,
                required: true,
            }, {
                new_donate_alert_sound: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    file_selection_method: {
                        required: true,
                        type: String, enum: _.values(file_selection_method_constant)
                    },
                    link_or_name_of_file: {
                        required: items?.general_settings?.new_donate_alert_sound?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    },
                    sound_volume: {
                        required: items?.general_settings?.new_donate_alert_sound?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: Number,
                        size: { min: 0, max: 100 }
                    },
                },
                timing: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    alert_show_time: {
                        required: items?.general_settings?.timing?.change_status_of_this_section_for_this_condition === change_status_of_this_section_for_this_condition.without_change ? false : true,
                        type: Number,
                        size: { min: 0, max: 60 }
                    },
                    alert_delay_time: {
                        required: items?.general_settings?.timing?.change_status_of_this_section_for_this_condition === change_status_of_this_section_for_this_condition.without_change ? false : true,
                        type: Number,
                        size: { min: 0, max: 60 }
                    },
                    show_delay_sponser_details: {
                        required: items?.general_settings?.timing?.change_status_of_this_section_for_this_condition === change_status_of_this_section_for_this_condition.without_change ? false : true,
                        type: Number,
                        size: { min: 0, max: 60 }
                    },
                }
            }),

            appearance_settings: _.assign({}, {
                type: Object,
                required: true,
            }, {
                appearance_profile_of_the_sponsor_profile_box: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    file_selection_method: {
                        required: true,
                        type: String, enum: _.values(file_selection_method_constant)
                    },
                    file_type: {
                        type: String,
                        required: items?.appearance_settings?.appearance_profile_of_the_sponsor_profile_box?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: _.values(file_type_constant)
                    },
                    link_or_name_of_file: {
                        required: items?.appearance_settings?.appearance_profile_of_the_sponsor_profile_box?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    },    
                },
            }),

            send_emoji: _.assign({}, {
                type: Object,
                required: true,
            }, {
                general_settings: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    placemant_position: { type: String,
                        required: items?.send_emoji?.general_settings?.change_status_of_this_section_for_this_condition === change_status_of_this_section_for_this_condition.without_change ? false : true,
                        enum: _.values(send_emoji_placemants_constant)
                    },
                }
            }),

            send_voice: _.assign({}, {
                type: Object,
                required: true,
            }, {
                general_settings: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    alert_delay_time: { 
                        type: Number,
                        required: items?.send_voice?.general_settings?.change_status_of_this_section_for_this_condition === change_status_of_this_section_for_this_condition.without_change ? false : true,
                    },
                    volume: { 
                        type: Number,
                        required: items?.send_voice?.general_settings?.change_status_of_this_section_for_this_condition === change_status_of_this_section_for_this_condition.without_change ? false : true,
                        size: { min: 0, max: 60 }
                    },
                }
            }),

            video_content_settings_tool: _.assign({}, {
                type: Object,
                required: true,
            }, {
                background_content_sponsor_profile: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    file_selection_method: {
                        required: true,
                        type: String, enum: _.values(file_selection_method_constant)
                    },
                    file_type: {
                        type: String,
                        required: items?.video_content_settings_tool?.background_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: _.values(file_type_constant)
                    },
                    link_or_name_of_file: {
                        required: items?.video_content_settings_tool?.background_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    }
                },

                content_top_sponsor_profile: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    file_selection_method: {
                        required: true,
                        type: String, enum: _.values(file_selection_method_constant)
                    },
                    file_type: {
                        type: String,
                        required: items?.video_content_settings_tool?.content_top_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: _.values(file_type_constant)
                    },
                    link_or_name_of_file: {
                        required: items?.video_content_settings_tool?.content_top_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    }
                },

                content_below_sponsor_profile: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    file_selection_method: {
                        required: true,
                        type: String, enum: _.values(file_selection_method_constant)
                    },
                    file_type: {
                        type: String,
                        required: items?.video_content_settings_tool?.content_below_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: _.values(file_type_constant)
                    },
                    link_or_name_of_file: {
                        required: items?.video_content_settings_tool?.content_below_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    }
                },

                content_right_sponsor_profile: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    file_selection_method: {
                        required: true,
                        type: String, enum: _.values(file_selection_method_constant)
                    },
                    file_type: {
                        type: String,
                        required: items?.video_content_settings_tool?.content_right_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: _.values(file_type_constant)
                    },
                    link_or_name_of_file: {
                        required: items?.video_content_settings_tool?.content_right_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    }
                },

                content_left_sponsor_profile: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    file_selection_method: {
                        required: true,
                        type: String, enum: _.values(file_selection_method_constant)
                    },
                    file_type: {
                        type: String,
                        required: items?.video_content_settings_tool?.content_left_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: _.values(file_type_constant)
                    },
                    link_or_name_of_file: {
                        required: items?.video_content_settings_tool?.content_left_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    }
                },

                content_bottom_sponsor_profile: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    file_selection_method: {
                        required: true,
                        type: String, enum: _.values(file_selection_method_constant)
                    },
                    file_type: {
                        type: String,
                        required: items?.video_content_settings_tool?.content_bottom_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: _.values(file_type_constant)
                    },
                    link_or_name_of_file: {
                        required: items?.video_content_settings_tool?.content_bottom_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    }
                },

            }),

        })

        schema.message(this.errorMessages);

        return this.sanitizeErrors(
            schema.validate(_.assign({}, items)),
            throwErrors,
        );
    }

    update(items: any, throwErrors = true) {
        console.log(items?.general_settings?.new_donate_alert_sound?.file_selection_method)
        const schema = new Schema({
            _id: _.assign({}, {
                type: String,
                required: true,
                use: { isObjectId }
            }),
            type_of_conditions: _.assign({}, {
                type: String,
                required: true,
                enum: _.values(conditions_enums)
            }),
            amount: _.assign({}, {
                type: Number,
                required: true
            }),

            general_settings: _.assign({}, {
                type: Object,
                required: false,
            }, {
                new_donate_alert_sound: {
                    change_status_of_this_section_for_this_condition: { type: String, required: false, enum: _.values(change_status_of_this_section_for_this_condition) },
                    file_selection_method: {
                        required: false,
                        type: String, enum: _.values(file_selection_method_constant)
                    },
                    file_type: {
                        type: String,
                        required: items?.general_settings?.new_donate_alert_sound?.file_selection_method === file_selection_method_constant.no_content || undefined ? false : items?.general_settings?.new_donate_alert_sound?.file_selection_method === undefined ? false : true,
                        enum: _.values(file_type_constant)
                    },
                    link_or_name_of_file: {
                        required: items?.general_settings?.new_donate_alert_sound?.file_selection_method === file_selection_method_constant.no_content ? false : items?.general_settings?.new_donate_alert_sound?.file_selection_method === undefined ? false : true,
                        type: String
                    },
                    sound_volume: {
                        required: items?.general_settings?.new_donate_alert_sound?.file_selection_method === file_selection_method_constant.no_content ? false : items?.general_settings?.new_donate_alert_sound?.file_selection_method === undefined ? false : true,
                        type: String,
                        size: { min: 0, max: 100 }
                    },
                },
                timing: {
                    change_status_of_this_section_for_this_condition: { type: String, required: false, enum: _.values(change_status_of_this_section_for_this_condition) },
                    alert_show_time: {
                        required: items?.general_settings?.timing?.change_status_of_this_section_for_this_condition === change_status_of_this_section_for_this_condition.without_change ? false : items?.general_settings?.timing?.change_status_of_this_section_for_this_condition === undefined ? false : true,
                        type: Number,
                        size: { min: 0, max: 60 }
                    },
                    alert_delay_time: {
                        required: items?.general_settings?.timing?.change_status_of_this_section_for_this_condition === change_status_of_this_section_for_this_condition.without_change ? false : items?.general_settings?.timing?.change_status_of_this_section_for_this_condition === undefined ? false : true,
                        type: Number,
                        size: { min: 0, max: 60 }
                    },
                    show_delay_sponser_details: {
                        required: items?.general_settings?.timing?.change_status_of_this_section_for_this_condition === change_status_of_this_section_for_this_condition.without_change ? false : items?.general_settings?.timing?.change_status_of_this_section_for_this_condition === undefined ? false : true,
                        type: Number,
                        size: { min: 0, max: 60 }
                    },
                }
            }),

            appearance_settings: _.assign({}, {
                type: Object,
                required: true,
            }, {
                appearance_profile_of_the_sponsor_profile_box: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    file_selection_method: {
                        required: true,
                        type: String, enum: _.values(file_selection_method_constant)
                    },
                    file_type: {
                        type: String,
                        required: items?.appearance_settings?.appearance_profile_of_the_sponsor_profile_box?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: _.values(file_type_constant)
                    },
                    link_or_name_of_file: {
                        required: items?.appearance_settings?.appearance_profile_of_the_sponsor_profile_box?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    },    
                },
            }),

            send_emoji: _.assign({}, {
                type: Object,
                required: true,
            }, {
                general_settings: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    placemant_position: { type: String,
                        required: items?.send_emoji?.general_settings?.change_status_of_this_section_for_this_condition === change_status_of_this_section_for_this_condition.without_change ? false : true,
                        enum: _.values(send_emoji_placemants_constant)
                    },
                }
            }),

            send_voice: _.assign({}, {
                type: Object,
                required: true,
            }, {
                general_settings: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    alert_delay_time: { 
                        type: Number,
                        required: items?.send_voice?.general_settings?.change_status_of_this_section_for_this_condition === change_status_of_this_section_for_this_condition.without_change ? false : true,
                    },
                    volume: { 
                        type: Number,
                        required: items?.send_voice?.general_settings?.change_status_of_this_section_for_this_condition === change_status_of_this_section_for_this_condition.without_change ? false : true,
                        size: { min: 0, max: 60 }
                    },
                }
            }),

            video_content_settings_tool: _.assign({}, {
                type: Object,
                required: true,
            }, {
                background_content_sponsor_profile: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    file_selection_method: {
                        required: true,
                        type: String, enum: _.values(file_selection_method_constant)
                    },
                    file_type: {
                        type: String,
                        required: items?.video_content_settings_tool?.background_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: _.values(file_type_constant)
                    },
                    link_or_name_of_file: {
                        required: items?.video_content_settings_tool?.background_content_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    }
                },

                content_top_sponsor_profile: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    file_selection_method: {
                        required: true,
                        type: String, enum: _.values(file_selection_method_constant)
                    },
                    file_type: {
                        type: String,
                        required: items?.video_content_settings_tool?.content_top_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: _.values(file_type_constant)
                    },
                    link_or_name_of_file: {
                        required: items?.video_content_settings_tool?.content_top_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    }
                },

                content_below_sponsor_profile: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    file_selection_method: {
                        required: true,
                        type: String, enum: _.values(file_selection_method_constant)
                    },
                    file_type: {
                        type: String,
                        required: items?.video_content_settings_tool?.content_below_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: _.values(file_type_constant)
                    },
                    link_or_name_of_file: {
                        required: items?.video_content_settings_tool?.content_below_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    }
                },

                content_right_sponsor_profile: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    file_selection_method: {
                        required: true,
                        type: String, enum: _.values(file_selection_method_constant)
                    },
                    file_type: {
                        type: String,
                        required: items?.video_content_settings_tool?.content_right_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: _.values(file_type_constant)
                    },
                    link_or_name_of_file: {
                        required: items?.video_content_settings_tool?.content_right_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    }
                },

                content_left_sponsor_profile: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    file_selection_method: {
                        required: true,
                        type: String, enum: _.values(file_selection_method_constant)
                    },
                    file_type: {
                        type: String,
                        required: items?.video_content_settings_tool?.content_left_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: _.values(file_type_constant)
                    },
                    link_or_name_of_file: {
                        required: items?.video_content_settings_tool?.content_left_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    }
                },

                content_bottom_sponsor_profile: {
                    change_status_of_this_section_for_this_condition: { type: String, required: true, enum: _.values(change_status_of_this_section_for_this_condition) },
                    file_selection_method: {
                        required: true,
                        type: String, enum: _.values(file_selection_method_constant)
                    },
                    file_type: {
                        type: String,
                        required: items?.video_content_settings_tool?.content_bottom_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        enum: _.values(file_type_constant)
                    },
                    link_or_name_of_file: {
                        required: items?.video_content_settings_tool?.content_bottom_sponsor_profile?.file_selection_method === file_selection_method_constant.no_content ? false : true,
                        type: String
                    }
                },

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