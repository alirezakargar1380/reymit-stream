const Schema = require('validate');
const _ = require('lodash');
import log from "../../utils/log.utility"
import Exception from "../../utils/error.utility"

class Validate {
    private fields: {
        social_media_inside_gateway_link: {
            type: ObjectConstructor
        }
        background_pattern_image_link: {
            type: StringConstructor
        }
        background_image_link: {
            type: StringConstructor
        }
        first_color: {
            type: StringConstructor
        }
        second_color: {
            type: StringConstructor
        }
        twitch_account_username: {
            type: StringConstructor
        }
        show_link_in_stram: {
            type: BooleanConstructor
        }
    };
    private errorMessages: {
        length: () => string;
        match: () => string;
        type: () => string;
        required: () => string;
        validation: () => string
    };
    private headerErrorMessages: {
        length: () => string;
        type: () => string;
        required: () => string;
        validation: () => string
    };

    constructor() {
        this.fields = {
            social_media_inside_gateway_link: {
                type: Object,
            },
            background_pattern_image_link: {
                type: String,
            },
            background_image_link: {
                type: String,
            },
            first_color: {
                type: String,
            },
            second_color: {
                type: String,
            },
            twitch_account_username: {
                type: String,
            },
            show_link_in_stram: {
                type: Boolean,
            },
        }
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

    update_appearance_settings(items: any, throwErrors = true) {
        const schema = new Schema({
            background_pattern_image_link: _.assign({},
                this.fields.background_pattern_image_link, {
                required: true,
                type: String,
            },
            ),
            background_image_link: _.assign({},
                this.fields.background_image_link, {
                required: true,
                type: String,
            }),
            first_color: _.assign({},
                this.fields.first_color, {
                required: true,
                type: String,
            }),
            second_color: _.assign({},
                this.fields.second_color, {
                required: true,
                type: String,
            }),
            twitch_account_username: _.assign({},
                this.fields.twitch_account_username, {
                required: true,
                type: String,
            }),
            show_link_in_stram: _.assign({},
                this.fields.show_link_in_stram, {
                required: true,
                type: Boolean,
            }),
            social_media_inside_gateway_link:
                _.assign({},
                    this.fields.social_media_inside_gateway_link, {
                    required: true,
                    telegram: {
                        type: String,
                        required: true,
                    },
                    youtube: String,
                    facebook: String,
                    instagram: String,
                    twitch: String,
                    discord: String,
                    aparat: String,
                })
        });

        console.log(items);
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